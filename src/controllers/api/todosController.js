/**
 * Todos API Controller
 */
import Todo from "../../models/todo.js";

/**
 * Get a single todo
 */
export const getTodo = async (req, res, next) => {
    const { id } = req.params;
    const todo = await Todo.query()
        .findById(id)
        .withGraphFetched('category');
    if (!todo) {
        res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
};

/**
 * Get all todos
 */
export const getTodos = async (req, res, next) => {
    const todos = await Todo.query();
    res.json(todos);
};

/**
 * Create a new todo
 */
export const createTodo = async (req, res, next) => {
    const { title, category_id } = req.body;
    const todo = await Todo.query().insert({ 
        title,
        category_id 
    });
    res.status(201).json({ message: "Todo created", todo });
};

/**
 * Update a todo
 *
 */
export const updateTodo = async (req, res, next) => {
    const { id, title, isDone, isDeleted } = req.body;
    if (!id) {
        res.status(400).json({ message: "ID is required" });
    }
    const todo = await Todo.query().patchAndFetchById(id, {
        title,
        isDone,
        isDeleted
    });
    if (!todo) {
        res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo updated", todo });
};

/**
 * Delete a todo
 */
export const deleteTodo = async (req, res, next) => {
    const { id } = req.params;
    const deletedTodo = await Todo.query().deleteById(id);
    if (deletedTodo === 0) {
        res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted" });
};