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

import createProductSubCategoryReducer from "@/redux/slices/productCategorySlices/SubCategorySlices/createSubCategorySlice";

import getAllProductSubCategoriesReducer from "@/redux/slices/productCategorySlices/SubCategorySlices/getAllSubCategories";
import updateMainCategoryReducer from "@/redux/slices/productCategorySlices/updateCategorySlice";

//child category reducers import

import fetchChildCategoryReducer from "@/redux/slices/productCategorySlices/ChildCategorySlices/fetchChildCategorySlice";
import createChildCategoryReducer from "@/redux/slices/productCategorySlices/ChildCategorySlices/createChildCategorySlice";

//product attribution slice import

import createAttributeReducer from "@/redux/slices/Product/productAttributionSlice/productAttributionSlice";
import fetchAttributesReducer from "@/redux/slices/Product/productAttributionSlice/fetchAttributesSlice";
import updateAttributeReducer from "@/redux/slices/Product/productAttributionSlice/updateAttributeSlice";

//brands slice import

import createBrandReducer from "@/redux/slices/Product/productBrandSlice/createProductBrandSlice";
import fetchBrandsReducer from "@/redux/slices/Product/productBrandSlice/fetchBrandsSlice";
import updateBrandReducer from "@/redux/slices/Product/productBrandSlice/updateBrandSlice";

// product delivery time reducers

import getAllDeliveryTimesReducer from "@/redux/slices/Product/DeliveryTime/getAllDeliveryTimesSlice";
import createDeliveryTimeReducer from "@/redux/slices/Product/DeliveryTime/createDeliveryTimeSlice";
import updateDeliveryTimeReducer from "@/redux/slices/Product/DeliveryTime/updateDeliveryTimeSlice";

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

    //sub categ

    createProductSubCategory: createProductSubCategoryReducer,
    getAllProductSubCategories: getAllProductSubCategoriesReducer,
    updateMainCategory: updateMainCategoryReducer,

    //child category reducers

    fetchChildCategories: fetchChildCategoryReducer,
    createChildCategory: createChildCategoryReducer,

    //attribution slice reducers

    createAttribute: createAttributeReducer,
    fetchAttributes: fetchAttributesReducer,
    updateProductAttributes: updateAttributeReducer,

    //brands

    createBrand: createBrandReducer,
    fetchBrands: fetchBrandsReducer,
    updateBrand: updateBrandReducer,

    //  New delivery time slices

    getAllDeliveryTimes: getAllDeliveryTimesReducer,
    createDeliveryTime: createDeliveryTimeReducer,
    updateDeliveryTime: updateDeliveryTimeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
