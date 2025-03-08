const db = require('../../models/knex/knex.js')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

module.exports = {

uploadingVideo: async (req, res) => {


try {
  const { title } = req.body.data;
  console.log(title)
  const { id_user } = req.user;
  const user = await db('user').where('id_user', id_user)
  .first() 
  

  if(!user.isAdmin){
    return res.status(400).json({ error: 'Uhnatorized.' });

  }  

  if (!req.file) {
    return res.status(400).json({ error: 'No video file uploaded.' });
  }
  const course = await db('course')
    .where('id_user', id_user)
    .andWhere('title', title.trim()) 
    .first()
    
    if (!course) {
    
      return res.status(400).json({ 
      	message: 'It is not possible to upload video, course does not exist.' });
    }


    
    const fileName = path.basename(req.file.path)
    const link = `http://localhost:${process.env.PORT}/video/${fileName}`;

   
    await db('lesson').insert({
      id_lesson: uuid.v4(),
      video_url: link,
      id_course: course.id_course,
    });

   
    res.status(200).json({
      message: 'Video uploaded successfully',
      link: link
    });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ error: 'An error occurred while uploading the video.' });
  }
},
deleteVideo: async (req, res) => {
    try {
        const { id_user } = req.user;
        const user = await db('user')
            .where('id_user', id_user)
            .first();

        if (!user.isAdmin) {
            return res.status(403).json({ message: "You don't have permission to delete videos" });
        }

        const {filename } = req.params;
        const videoId = filename;

        const lesson = await db('lesson')
            .where('video_url', 'like', `%${videoId}%`)
             .first();

        if (!lesson) {
            return res.status(404).json({ message: 'Video does not exist' });
        }

        const videoPath =  path.join(__dirname, '..','..', 'public', 'uploads', filename);

        if (fs.existsSync(videoPath)) {
            fs.unlinkSync(videoPath);
        } else {
            console.warn(`File not found: ${videoPath}`);
        }

        await db('lesson')
            .where('id_lesson', lesson.id_lesson)
            .del();

        return res.status(200).json({ message: 'Video deleted successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error from the server: ' + err.message });
    }
},
}