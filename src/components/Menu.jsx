
function Menu(props) {
  
    return (
        <>
        <div className="nk-content ">
            <div className="container">
                <div className="nk-content-inner">
                    <div className="nk-content-body">
                        <div className="nk-block-head nk-block-head-sm">
                            <div className="nk-block-between">
                                <div className="nk-block-head-content">
                                    <h3 className="nk-block-title page-title">Menu</h3>
                                </div>
                                <div className="nk-block-head-content">
                                    <div className="toggle-wrap nk-block-tools-toggle">
                                        <a
                                            href="#"
                                            className="btn btn-icon btn-trigger toggle-expand me-n1"
                                            data-target="pageMenu"
                                        >
                                            <em className="icon ni ni-more-v"></em>
                                        </a>
                                        <div
                                            className="toggle-expand-content"
                                            data-content="pageMenu"
                                        >
                                            <ul className="nk-block-tools g-3">
                                                <li>
                                                    <div className="form-control-wrap">
                                                        <div className="form-icon form-icon-right">
                                                            <em className="icon ni ni-search"></em>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="default-04"
                                                            placeholder="Quick search by id"
                                                        />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="drodown">
                                                        <a
                                                            href="#"
                                                            className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                                                            data-bs-toggle="dropdown"
                                                        >
                                                            Status
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <ul className="link-list-opt no-bdr">
                                                                <li>
                                                                    <a href="#">
                                                                        <span>New Items</span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        <span>Featured</span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        <span>Out of Stock</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="nk-block-tools-opt">
                                                    <a
                                                        href="#"
                                                        data-target="addProduct"
                                                        className="toggle btn btn-icon btn-primary d-md-none"
                                                    >
                                                        <em className="icon ni ni-plus"></em>
                                                    </a>
                                                    <a
                                                        href="#"
                                                        data-target="addProduct"
                                                        className="toggle btn btn-primary d-none d-md-inline-flex"
                                                    >
                                                        <em className="icon ni ni-plus"></em>
                                                        <span>Add Product</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {props.isLoading ? (
                            "Loading..."
                        ) : (
                            <div className="nk-block">
                                <div className="row g-gs">
                                    {props.products.map((product, index) => (
                                        <div key={product.id} className="col-xxl-3 col-lg-4 col-sm-6">
                                            <div className="card card-bordered product-card">
                                            <div className="product-thumb">
                                                <a href="html/product-details.html">
                                                <img
                                                    className="card-img-top"
                                                    src={product.image}
                                                    alt={product.name}
                                                />
                                                </a>
                                                <ul className="product-badges">
                                                <li>
                                                    <span className="badge bg-success">{product.availability}</span>
                                                </li>
                                                </ul>
                                                <ul className="product-actions">
                                                <li>
                                                    <a href="#">
                                                    <em className="icon ni ni-heart"></em>
                                                    </a>
                                                </li>
                                                </ul>
                                            </div>
                                            <div className="card-inner">
                                                <h5 className="product-title">{product.name}</h5>
                                                <ul className="preview-list d-flex justify-content-between">
                                                <li className="preview-item">
                                                    <span className="badge bg-outline-danger">
                                                    &#x20B1;{props.selections[index].selectedPrice}
                                                    </span>
                                                </li>
                                                <li className="preview-item">
                                                    <span className="badge bg-outline-info">
                                                    Stock: {product.stock}
                                                    </span>
                                                </li>
                                                </ul>
                                                <p className="m-0">Specification:</p>
                                                <ul className="product-tags">
                                                {[10, 20, 30, 40, 50, 100].map((length) => (
                                                    <button
                                                    key={length}
                                                    type="button"
                                                    className="btn"
                                                    data-bs-toggle="button"
                                                    onClick={() => props.handleLengthSelection(index, length)}
                                                    disabled={
                                                        props.selections[index].isSelected &&
                                                        props.selections[index].selectedLength !== length
                                                    }
                                                    >
                                                    {length}m
                                                    </button>
                                                ))}
                                                </ul>
                                                <div className="m-3 d-flex justify-content-between">
                                                <div className="preview-title">Quantity:</div>
                                                <div className="btn-group btn-group-sm">
                                                    <button
                                                    onClick={() => props.handleQuantityChange(index, -1)}
                                                    type="button"
                                                    className="btn btn-outline-primary"
                                                    disabled={props.selections[index].quantity === 1}
                                                    >
                                                    -
                                                    </button>
                                                    <button type="button" className="btn btn-outline-primary">
                                                    {props.selections[index].quantity}
                                                    </button>
                                                    <button
                                                    onClick={() => props.handleQuantityChange(index, 1)}
                                                    type="button"
                                                    className="btn btn-outline-primary"
                                                    >
                                                    +
                                                    </button>
                                                </div>
                                                </div>
                                                <button
                                                className="btn btn-success mt-1"
                                                >
                                                Add to Cart
                                                </button>
                                            </div>
                                            </div>
                                        </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                        <div
                            className="nk-add-product toggle-slide toggle-slide-right"
                            data-content="addProduct"
                            data-toggle-screen="any"
                            data-toggle-overlay="true"
                            data-toggle-body="true"
                            data-simplebar
                        >
                            <div className="nk-block-head">
                                <div className="nk-block-head-content">
                                    <h5 className="nk-block-title">New Product</h5>
                                    <div className="nk-block-des">
                                        <p>Add information and add new product.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="nk-block">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="product-title">
                                                Product Title
                                            </label>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="product-title"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="regular-price">
                                                Regular Price
                                            </label>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="regular-price"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="sale-price">
                                                Sale Price
                                            </label>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="sale-price"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="stock">
                                                Stock
                                            </label>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="stock"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="SKU">
                                                SKU
                                            </label>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="SKU"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="category">
                                                Category
                                            </label>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="category"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="tags">
                                                Tags
                                            </label>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="tags"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="upload-zone small bg-lighter my-2">
                                            <div className="dz-message">
                                                <span className="dz-message-text">
                                                    Drag and drop file
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary">
                                            <em className="icon ni ni-plus"></em>
                                            <span>Add New</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
        )
}

export default Menu;

// const addProductToCart = (product) => {
//     const findProductInCart = cart.find((item) => item.id === product.id);

//     if (findProductInCart) {
//       const newCart = cart.map((item) =>
//         item.id === product.id
//           ? {
//               ...item,
//               quantity: item.quantity + 1,
//               totalaAmount: item.price * (item.quantity + 1),
//             }
//           : item
//       );
//       setCart(newCart);
//     } else {
//       const addingProduct = {
//         ...product,
//         quantity: 1,
//         totalaAmount: product.price,
//       };
//       setCart([...cart, addingProduct]);
//     }
//   };
