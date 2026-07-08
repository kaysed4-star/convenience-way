const express =
  require("express");

const multer =
  require("multer");

const streamifier =
  require("streamifier");

const cloudinary =
  require("../config/cloudinary");

const router =
  express.Router();

const storage =
  multer.memoryStorage();

const upload =
  multer({ storage });

router.post(

  "/",

  upload.single("image"),

  async (req, res) => {

    try {

      const streamUpload =
        () => {

          return new Promise(

            (resolve, reject) => {

              const stream =

                cloudinary.uploader.upload_stream(

                  {
                    resource_type: "auto"
                  },

                  (error, result) => {

                    if (result) {

                      resolve(result);

                    } else {

                      reject(error);

                    }

                  }

                );

              streamifier

                .createReadStream(
                  req.file.buffer
                )

                .pipe(stream);

            }

          );

        };

      const result =
        await streamUpload();

      res.json({

        imageUrl:
          result.secure_url

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message

      });

    }

  }

);

module.exports = router;