// redux store
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice/authSlice";
//products reducers import

import createProductReducer from "../slices/productSlices/createProductSlice";
import updateProductReducer from "@/redux/slices/productSlices/updateProductSlice";
import getAllProductsReducer from "@/redux/slices/productSlices/getAllProductsSlice";

//products Category reducers import
import createCategoryReducer from "@/redux/slices/productCategorySlices/createCategorySlice";
import updateCategoryReducer from "@/redux/slices/productCategorySlices/updateCategorySlice";
import getAllCategoriesReducer from "@/redux/slices/productCategorySlices/getCategoriesSlice";
import getCategoryByIdReducer from "@/redux/slices/productCategorySlices/getCategoryById";

import createProductSubCategoryReducer from "@/redux/slices/productCategorySlices/SubCategorySlices/createSubCategorySlice";

import getAllProductSubCategoriesReducer from "@/redux/slices/productCategorySlices/SubCategorySlices/getAllSubCategories";
const store = configureStore({
  reducer: {
    auth: authReducer,
    //products reducers

    createProduct: createProductReducer,
    updateProduct: updateProductReducer,
    getAllProducts: getAllProductsReducer,

    //products Category reducers
    createCategory: createCategoryReducer,
    updateCategory: updateCategoryReducer,
    getAllCategories: getAllCategoriesReducer,
    getCategoryById: getCategoryByIdReducer,
    //sub categ
    createProductSubCategory: createProductSubCategoryReducer,
    getAllProductSubCategories: getAllProductSubCategoriesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
