import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "Todos",
    initialState: {
        todo: []
    },
    reducers: {
        addTodo: (state, action) => {
            state.todo.push({
                title: action.payload.title,
                id: nanoid()
            });
        },
        removeTodo: (state, action) => {
            state.todo.splice(action.payload.index, 1);
        },
        edittodo: (state, action) => {
            const { index, title } = action.payload;
            state.todo[index].title = title;
        }
    }
});

export const { addTodo, removeTodo, edittodo } = todoSlice.actions;
export default todoSlice.reducer;