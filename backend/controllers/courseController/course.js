const db = require('../../models/knex/knex.js');
const uuid = require('uuid');
const { s3Client } = require('../../utils.js');
const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { Upload } = require('@aws-sdk/lib-storage');

module.exports = {
  uploadingVideo: async (req, res) => {
    try {
      const { id_course } = req.body;
      const { id_user } = req.user;
      const user = await db('user').where('id_user', id_user).first();

      if (!user.isAdmin) {
        return res.status(400).json({ error: 'Unauthorized.' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No video file uploaded.' });
      }

      const course = await db('course')
        .where('id_user', id_user)
        .andWhere('id_course', id_course)
        .first();

      if (!course) {
        return res.status(400).json({ message: 'It is not possible to upload video, course does not exist.' });
      }

      const fileName = `${Date.now()}-${req.file.originalname.replace(/\s+/g, '-')}`;
      const s3Key = `videos/${fileName}`;

      const upload = new Upload({
        client: s3Client,
        params: {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: s3Key,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        },
      });

      const result = await upload.done();

      await db('lesson').insert({
        id_lesson: uuid.v4(),
        s3_key: s3Key,
        id_course: course.id_course,
      });

      res.status(200).json({
        message: 'Video uploaded successfully',
        s3_key: s3Key,
      });
    } catch (error) {
      console.error('Error during file upload:', error);
      res.status(500).json({ error: 'An error occurred while uploading the video.' });
    }
  },

  getVideo: async (req, res) => {
    const { key } = req.params;

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `videos/${key}`,
    });

    try {
      const url = await getSignedUrl(s3Client, command, { expiresIn: 5000 });

      if (!url) {
        return res.status(400).json({ message: 'Failed to generate pre-signed URL' });
      }

      return res.status(200).json({ url });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error from the server: ' + err.message });
    }
  },

  deleteVideo: async (req, res) => {
    const { key } = req.params;
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `videos/${key}`,
    });

    try {
      await s3Client.send(command);
      return res.status(200).json({ message: 'Video deleted successfully' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error from the server: ' + err.message });
    }
  },

  getCourse:async (req,res) =>{
    const {key} = req.params;
    const {id_user} = req.user;
    
    try {
      const course = await db('course')
      .where('id_course',key)
      db.andWhere('id_user',id_user)
      .first();
    
      if(!course){
        return res.status(400).json({message: 'Course not found'});
      }
      
      const Course = course[0]
      const infoCourse = {
        title: Course.title,
        desc: Course.description,
        image: Course.image

      }
      

      return res.status(200).json(infoCourse);


    }catch(err){
      console.log(err);
      return res.status(500).json({ message: 'Error from the server: ' + err.message });
    }



  },

  
  deleteCourse: async (req, res) => {
    const { key } = req.params;
    const { id_user } = req.user;

    try {
     

      const course = await db('course')
        .where('id_course', key)
        .andWhere('id_user', id_user)
        .first();

      if (!course) {
        return res.status(400).json({ message: 'Course not found' });
      }

      await db('course').where('id_course', key).del();
    
      return res.status(200).json({ message: 'Course deleted successfully' });
    
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error from the server: ' + err.message });
    }
  
  
  }

};