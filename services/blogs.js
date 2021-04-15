const Blogs = require('../models/blogs');

module.exports = class BlogService {
    async createBlog(blog) {
        return await Blogs.query().insertGraph(blog);
    }

    async updateById(id, blog) {
        const updatedBlog = await Blogs.query().findById(id).patch(blog);
        return updatedBlog;
    }

    async deleteById(blogId) {
        return await Blogs.query().deleteById(blogId);
    }

    async findAll() {
        return await Blogs.query();
    }

    async getAll(user_id) {
        // console.log(user_id);
        return await Blogs.query().where("user_id",user_id);
    }

    async findById(blogId) {
        const id = await Blogs.query().findById(blogId);
        if (id == undefined) {
            return ({"sorry": `blogId ${blogId} not found!`});
        }
        return id;
    }
}