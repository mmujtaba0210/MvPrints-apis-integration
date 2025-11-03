// redux store
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice/authSlice";

//products reducers import
import paginatedProductsReducer from "../slices/productSlices/paginationProductSlice";
import createProductReducer from "../slices/productSlices/createProductSlice";
import updateProductReducer from "@/redux/slices/productSlices/updateProductSlice";
import fetchProductsReducer from "@/redux/slices/productSlices/getAllProductsSlice";
import deleteProductReducer from "@/redux/slices/productSlices/deleteProductSlice";

//products Category reducers import

import createCategoryReducer from "@/redux/slices/productCategorySlices/createCategorySlice";
import updateCategoryReducer from "@/redux/slices/productCategorySlices/updateCategorySlice";
import getAllCategoriesReducer from "@/redux/slices/productCategorySlices/getCategoriesSlice";
import deleteMainCategoryReducer from "@/redux/slices/productCategorySlices/deleteMainCategorySlice";

//sub category slices import

import createProductSubCategoryReducer from "@/redux/slices/productCategorySlices/SubCategorySlices/createSubCategorySlice";
import getAllProductSubCategoriesReducer from "@/redux/slices/productCategorySlices/SubCategorySlices/getAllSubCategories";
import updateSubCategoryReducer from "@/redux/slices/productCategorySlices/SubCategorySlices/updateSubCategorySlice";
import updateSubCategoryReducr, {
  deleteSubCategory,
} from "@/redux/slices/productCategorySlices/SubCategorySlices/deleteSubCategorySlice";

//child category reducers import

import fetchChildCategoryReducer from "@/redux/slices/productCategorySlices/ChildCategorySlices/fetchChildCategorySlice";
import createChildCategoryReducer from "@/redux/slices/productCategorySlices/ChildCategorySlices/createChildCategorySlice";
import deleteChildCategoryReducer from "@/redux/slices/productCategorySlices/ChildCategorySlices/deleteChildCategorySlice";

//product attribution slice import

import createAttributeReducer from "@/redux/slices/Product/productAttributionSlice/productAttributionSlice";
import fetchAttributesReducer from "@/redux/slices/Product/productAttributionSlice/fetchAttributesSlice";
import updateAttributeReducer from "@/redux/slices/Product/productAttributionSlice/updateAttributeSlice";
import deleteAttributionReducer from "@/redux/slices/Product/productAttributionSlice/deleteAttributionSlice";

//label Slice import

import getLabelsReducer from "@/redux/slices/Product/Label/getLabelsSlice";
import createLabelReducer from "@/redux/slices/Product/Label/createLabelSlice";
import updateLabelReducer from "@/redux/slices/Product/Label/updateLabelSlice";
import deleteLabelReducer from "@/redux/slices/Product/Label/deleteLabelSlice";

//label Slice import

import getColorReducer from "@/redux/slices/Product/Color/getColorSlice";
import createColorReducer from "@/redux/slices/Product/Color/createColorSlice";
import updateColorReducer from "@/redux/slices/Product/Color/updateColorSlice";
import deleteColorReducer from "@/redux/slices/Product/Color/deleteColorSlice";

//brands slice import

import createBrandReducer from "@/redux/slices/Product/productBrandSlice/createProductBrandSlice";
import fetchBrandsReducer from "@/redux/slices/Product/productBrandSlice/fetchBrandsSlice";
import updateBrandReducer from "@/redux/slices/Product/productBrandSlice/updateBrandSlice";
import deleteBrandReducer from "@/redux/slices/Product/productBrandSlice/deleteBrandSlice";

// product delivery time reducers

import getAllDeliveryTimesReducer from "@/redux/slices/Product/DeliveryTime/getAllDeliveryTimesSlice";
import createDeliveryTimeReducer from "@/redux/slices/Product/DeliveryTime/createDeliveryTimeSlice";
import updateDeliveryTimeReducer from "@/redux/slices/Product/DeliveryTime/updateDeliveryTimeSlice";
import deleteDeliveryTimeReducer from "@/redux/slices/Product/DeliveryTime/deleteDeliveryTimeSlice";

// charity slices import

import createCharityReducer from "@/redux/slices/Charities/createCharitySlice";
import getCharitiesReducer from "@/redux/slices/Charities/getCharitiesSlice";
import deleteCharityReducer from "@/redux/slices/Charities/deleteCharitySlice";
import updateCharityReducer from "@/redux/slices/Charities/updateCharitySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,

    //products reducers
    paginatedProducts: paginatedProductsReducer,
    createProduct: createProductReducer,
    updateProduct: updateProductReducer,
    fetchProducts: fetchProductsReducer,
    deleteProduct: deleteProductReducer,

    //products Category reducers

    createCategory: createCategoryReducer,
    updateCategory: updateCategoryReducer,
    getAllCategories: getAllCategoriesReducer,
    deleteMainCategory: deleteMainCategoryReducer,

    //sub categ

    createProductSubCategory: createProductSubCategoryReducer,
    getAllProductSubCategories: getAllProductSubCategoriesReducer,
    updateSubCategory: updateSubCategoryReducer,
    deleteSubCategory: updateSubCategoryReducr,

    //child category reducers

    fetchChildCategories: fetchChildCategoryReducer,
    createChildCategory: createChildCategoryReducer,
    deleteChildCategory: deleteChildCategoryReducer,

    //attribution slice reducers

    createAttribute: createAttributeReducer,
    fetchAttributes: fetchAttributesReducer,
    updateProductAttributes: updateAttributeReducer,
    deleteAttribution: deleteAttributionReducer,

    //labels

    getLabels: getLabelsReducer,
    createLabel: createLabelReducer,
    updateLabel: updateLabelReducer,
    deleteLabel: deleteLabelReducer,

    //colors

    getColor: getColorReducer,
    createColor: createColorReducer,
    updateColor: updateColorReducer,
    deleteColor: deleteColorReducer,

    //brands

    createBrand: createBrandReducer,
    fetchBrands: fetchBrandsReducer,
    updateBrand: updateBrandReducer,
    deleteBrand: deleteBrandReducer,

    //  New delivery time slices

    getAllDeliveryTimes: getAllDeliveryTimesReducer,
    createDeliveryTime: createDeliveryTimeReducer,
    updateDeliveryTime: updateDeliveryTimeReducer,
    deleteDeliveryTime: deleteDeliveryTimeReducer,

    //charity slices

    createCharity: createCharityReducer,
    getCharities: getCharitiesReducer,
    deleteCharity: deleteCharityReducer,
    updateCharity: updateCharityReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
