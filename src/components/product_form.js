import {  useEffect, useReducer } from "react";
import productApi from "../api/product";
import categoriesApi from "../api/category";
const initState = {
    productCode: "",
    productName: "",
    productPrice: "",
    productCategory: "",
    productDescription: "",
    productImage: "",
    productQuantity: "",
    productBarcode: "",
    categories: [],
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCT_CODE':
            return {
                ...state,
                productCode: action.productCode
            };
        case 'SET_PRODUCT_NAME':
            return {
                ...state,
                productName: action.productName
            };
        case 'SET_PRODUCT_PRICE':
            return {
                ...state,
                productPrice: action.productPrice
            };
        case 'SET_PRODUCT_CATEGORY':
            return {
                ...state,
                productCategory: action.productCategory
            };
        case 'SET_PRODUCT_DESCRIPTION':
            return {
                ...state,
                productDescription: action.productDescription
            };
        case 'SET_PRODUCT_IMAGE':
            console.log(action.productImage);
            return {
                ...state,
                productImage: action.productImage
            };
        case 'SET_PRODUCT_QUANTITY':
            return {
                ...state,
                productQuantity: action.productQuantity
            };
        case 'SET_PRODUCT_BARCODE':
            return {
                ...state,
                productBarCode: action.productBarCode
            };
        default:
            return state;
    }
};
const ProductForm = () => {

    // Use reducer to manage state
    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        categoriesApi.getCategories().then((res) => {
            dispatch({
                type: "SET_CATEGORIES",
                payload: res.data,
            });
        });
    }, []);

    // process image upload
    const processImageChange = (e) => {
        console.log(e);
        const image = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
           dispatch({ type: "SET_PRODUCT_IMAGE", productImage: reader.result });
        };
    };

    const addProduct = async () => {
        await productApi.addProduct(state).then((res) => {
            console.log(res);
        });
    };
    // Using UIkit
    return (
        <div className="uk-container uk-container-small">
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Mã sản phẩm</label>
                <div className="uk-form-controls">
                    <input className="uk-input" id="form-stacked-text" type="text" value={state.productCode} onChange={(e) => dispatch({ type: "SET_PRODUCT_CODE", productCode: e.target.value })} />
                </div>
            </div>
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Tên sản phẩm</label>
                <div className="uk-form-controls">
                    <input className="uk-input" id="form-stacked-text" type="text" value={state.productName} onChange={(e) => dispatch({ type: "SET_PRODUCT_NAME", productName: e.target.value })} />
                </div>
            </div>
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Giá sản phẩm</label>
                <div className="uk-form-controls">
                    <input className="uk-input" id="form-stacked-text" type="number" value={state.productPrice} onChange={(e) => dispatch({ type: "SET_PRODUCT_PRICE", productPrice: e.target.value })} />
                </div>
            </div>
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Danh mục</label>
                <div className="uk-form-controls">
                    <select className="uk-select" value={state.productCategory} onChange={(e) => dispatch({ type: "SET_PRODUCT_CATEGORY", productCategory: e.target.value })}>
                        <option value="0">Chọn danh mục</option>
                        {state.categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Mô tả sản phẩm</label>
                <div className="uk-form-controls">
                    <textarea className="uk-textarea" rows="5" value={state.productDescription} onChange={(e) => dispatch({ type: "SET_PRODUCT_DESCRIPTION", productDescription: e.target.value })}></textarea>
                </div>
            </div>
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Hình ảnh</label>
                <div className="uk-form-controls">
                    {/* Image upload and preview */}
                    <div className="image-upload">
                        <label htmlFor="product-image">
                            { state.productImage ? (
                                <img src={state.productImage} alt="product-image" />
                            ) : ( // if image is not uploaded
                                <div className="image-upload-placeholder">
                                    <i className="fas fa-camera"></i>
                                </div>
                            )}
                        </label>
                        <input id="product-image" type="file" accept="image/*" onChange={processImageChange} />
                    </div>
                </div>
            </div>
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Số lượng</label>
                <div className="uk-form-controls">
                    <input className="uk-input" id="form-stacked-text" type="number" value={state.productQuantity} onChange={(e) => dispatch({ type: "SET_PRODUCT_QUANTITY", productQuantity: e.target.value })} />
                </div>
            </div>
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Mã vạch</label>
                <div className="uk-form-controls">
                    <input className="uk-input" id="form-stacked-text" type="text" value={state.productBarcode} onChange={(e) => dispatch({ type: "SET_PRODUCT_BARCODE", productBarcode: e.target.value })} />
                </div>
            </div>
            <div className="uk-margin">
                <button className="uk-button uk-button-primary" onClick={() => addProduct ( state )} >Thêm sản phẩm</button>
            </div>
        </div>
    );

}
export default ProductForm;