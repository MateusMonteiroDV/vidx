const db = require('../../models/knex/knex.js')
const uuid = require('uuid')
const path = require('path')
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
    console.log(fileName)
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
}