const Comment = require("./../models/comment");

exports.addComment = async(req, res) => {
    const comment = {
        post_id: req.body.post_id,
        author: req.body.author,
        comment: req.body.comment
    };
    try {
        if (!comment.post_id || !comment.author || !comment.comment) {
            res.status(404).json({message: `There was an error adding your comment, please try again`, post_id: comment.post_id, author: comment.author, comment: comment.comment})
        } else {
            await Comment.addComment(comment);
            res.status(201).json({message: `Comment added!`})
        }
    } catch (err) {
        res.status(500).json({message: `There was an error adding your comment.`})
        console.log("error", err)
    }
};

exports.editComment = async(req, res) => {
    const { id } = req.params;
    const comment = {
        post_id: req.body.post_id,
        author: req.body.author,
        comment: req.body.comment
    };
   try {
    if (!id) {
        res.status(404).json({message: `There was an error updating your comment`,  post_id: comment.post_id, author: comment.author, comment: comment.comment})
    } else {
        await Comment.editComment(comment, id);
        res.status(200).json({message: `Comment updated!`})
    }
   } catch (err) {
       res.status(500).json({message: `There was an error updating your post`, err})
       console.log("error from edit comment", err)
   }
};