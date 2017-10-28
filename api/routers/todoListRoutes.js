module.exports = function(app) {
    var todoList = require('../controllers/todoListController')
    var userHandlers = require('../controllers/userController')

    app.route('/tasks')
        .get(userHandlers.loginRequired, todoList.list_all_tasks)
        .post(userHandlers.loginRequired, todoList.create_a_task)
    
    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task)
    
    app.route('/auth/register')
        .post(userHandlers.register)

    app.route('/auth/sign_in')
        .post(userHandlers.sign_in)
}