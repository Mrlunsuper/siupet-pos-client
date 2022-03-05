import { useState, useEffect } from "react";
import productApi from "../api/product";
import categoriesApi from "../api/category";
import ProductForm from "./product_form";
const Sale = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [categories, setCategories] = useState([]);

    const add_product_to_cart = (product) => {
        let productIndex = cart.findIndex((item) => item.id === product.id);
        if (productIndex === -1) {
            setCart([...cart, product]);
        }
        else {
            let newCart = [...cart];
            newCart[productIndex].quantity += 1;
            setCart(newCart);
        }
        setCartTotal(cartTotal + product.price);


    };

    const remove_product_from_cart = (product) => {
        let productIndex = cart.findIndex((item) => item.id === product.id);

        if (productIndex !== -1) {
            let newCart = [...cart];
            newCart[productIndex].quantity -= 1;
            if (newCart[productIndex].quantity === 0) {
                newCart.splice(productIndex, 1);
            }
            setCart(newCart);
        } else {
            setCart([]);
        }

        setCartTotal(cartTotal - product.price);
    };

    const seachProduct = async (e,) => {

        await productApi.searchProduct( e.target.value ).then((res) => {
            let products = res.data;
            products.map((product) => {
                product.quantity = 1;
                return product;
            });
            if (products.length === 1 && e.keyCode === 13) {
                add_product_to_cart(products[0]);
            }
            setProducts(products);
        });
    };
    const fetchProductsByCatergory = async (categoryId) => {
        await productApi.getProductsByCategory(categoryId).then((res) => {
            let products = res.data;
            products.map((product) => {
                product.quantity = 1;
                return product;
            });
            setProducts(products);
        });
    };

    const addCustomer = async (customer) => {
        await productApi.addCustomer(customer).then((res) => {
            console.log(res);
        });
    };
    useEffect(() => {
        productApi.getProducts().then((res) => {
            let products = res.data;
            products.map((product) => {
                product.quantity = 1;
                return product;
            });
            setProducts(products);
        });
        categoriesApi.getCategories().then((res) => {
            setCategories(res.data);
        });
    }, []);
    return(
        <div data-uk-grid>
            <div className="uk-width-1-6">
                <div className="uk-card uk-card-default uk-card-body">
                    {/* <div className="uk-card-title">Danh mục</div> */}
                    <div className="uk-card-title">Danh mục</div>
                    <ul className="uk-list uk-list-divider">
                        {categories.map((category) => {
                            return (
                                <li key={category.id} onClick={() => fetchProductsByCatergory(category.id)}>
                                    <span className="uk-label" style={{cursor:'pointer'}} >{category.name}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="uk-width-1-2 uk-height-1-1" uk-height-viewport="offset-top: true">
            <div className="uk-card uk-card-default uk-card-body">
                <div className="uk-card-title">Danh sách sản phẩm
                <button className="uk-button uk-button-primary uk-button-small uk-margin-left" uk-toggle="target: #my-id" type="button"><span data-uk-icon="icon:plus" className="uk-icon"></span></button>
                </div>
                    <div className="product-search uk-margin-top uk-margin-bottom">
                        <input className="uk-input" type="text" placeholder="Tìm sản phẩm..." onKeyUp={(e) => seachProduct(e)} />
                    </div>
                    <div>
                        <div className="uk-flex uk-flex-wrap">
                            { products.length > 0 && products.map((product) => 

                                    <div key={product.id} className="uk-width-1-3 uk-card uk-card-default uk-card-body uk-margin-bottom">
                                        <img src='http://localhost:3001/public/images/siupet.jpg' alt={product.name}/>
                                        <strong className="uk-card-title">{product.name}</strong>
                                        <p>{product.description}</p>
                                        <p>{formatPrice(product.price)}</p>
                                        <button className="uk-button uk-button-primary" onClick={ () => add_product_to_cart(product) }><span data-uk-icon="icon: plus"></span></button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="uk-width-1-3">
                    <div className="uk-card uk-card-default uk-card-body">
                        <h3 className="uk-card-title">Cart</h3>
                        <div className="">
                            <table className="uk-table uk-table-divider">
                                <thead>
                                    <tr>
                                        <th>SẢN PHẨM</th>
                                        <th>GIÁ</th>
                                        <th>SỐ LƯỢNG</th>
                                        <th>TỔNG</th>
                                        <th>HÀNH ĐỘNG</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { cart.length > 0 && cart.map((product) =>
                                        
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{formatPrice(product.price)}</td>
                                            <td>{product.quantity}</td>
                                            <td>{formatPrice( product.price * product.quantity )}</td>
                                            <td><button className="uk-button uk-button-danger" onClick={()=>remove_product_from_cart(product)}><span data-uk-icon="icon: minus"></span></button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="product-total uk-margin-top uk-margin-bottom">
                            <div className="uk-grid-small uk-flex-middle" data-uk-grid>
                                <div className="uk-width-auto">
                                    <span className="uk-text-middle">Tổng tiền:</span>
                                </div>
                                <div className="uk-width-expand">
                                    <span  className="uk-badge uk-text-middle">{formatPrice(cartTotal)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="uk-margin-top uk-margin-bottom customer">
                            <div className="uk-grid-small uk-flex-middle" data-uk-grid>
                                <div className="uk-width-auto">
                                    <span className="uk-text-middle">Khách hàng:</span>
                                </div>
                                <div className="uk-width-expand">
                                    <input className="uk-input" type="text" placeholder="Nhập tên khách hàng..." />

                                    <button className="uk-button uk-button-primary uk-inline" onClick={()=>addCustomer()}><span data-uk-icon="icon:plus" ></span></button>
                                </div>
                            </div>
                        </div>
                        <button className="uk-button uk-button-primary">Tính tiền</button>
                        <button className="uk-button uk-button-secondary">Tạm giữ</button>
                    </div>
            </div>


            <div id="my-id" data-uk-modal>
                    <div className="uk-modal-dialog uk-modal-body">
                        <button className="uk-modal-close-default" type="button" data-uk-close>
                            <span className="uk-icon" data-uk-icon="icon: close"></span>
                        </button>
                        <h2 className="uk-modal-title">Thêm sản phẩm</h2>
                        <ProductForm />
                    </div>
                </div>
        </div>
        
    );
}
const formatPrice = (price) => {
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'đ';
}
export default Sale;