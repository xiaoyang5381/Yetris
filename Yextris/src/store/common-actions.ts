import { createAction } from "@reduxjs/toolkit";
export const updateAction = createAction('UPDATE',(dt:number)=>({payload:dt}))