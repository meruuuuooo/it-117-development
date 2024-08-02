import { useState, useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Menu = () => {
    const [cart, setCart] = useState(
        () => JSON.parse(localStorage.getItem('cart')) || []
    );
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selections, setSelections] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [checkedItems, setCheckedItems] = useState([]);
    const [selectedTotal, setSelectedTotal] = useState(0);
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    
    const categories = [
        "All", // Option to show all products
        "New Items",
        "Featured",
        "Out of Stock",
        "Case",
        "CPU Cooler",
        "CPU",
        "Ethernet Cable",
        "Headphones",
        "Internal Hard Drive",
        "Keyboard",
        "Memory",
        "Monitor",
        "Motherboard",
        "Mouse",
        "Power Supply",
        "Slides",
        "Video Card"
    ];
    
    // Fetch products from local server
    const fetchProducts = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get('http://localhost:3000/products');
          const data = await response.data;
    
          const productsWithQuantities = data.map((product) => ({
            ...product,
            quantity: 1,
            selectedLength: product.category === "ethernet-cable" ? 10 : null,
            isSelected: false,
            selectedPrice: product.category === "ethernet-cable"
              ? (product.lengthPrices?.[10] || 0)
              : product.price
          }));
    
          setProducts(productsWithQuantities);
          setSelections(productsWithQuantities);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchProducts();
    }, []);
    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    
    const handleQuantityChange = (index, delta) => {
        setSelections((prevSelections) =>
          prevSelections.map((selection, i) => {
            if (i === index) {
              const newQuantity = Math.max(selection.quantity + delta, 1);
              return {
                ...selection,
                quantity: newQuantity,
                selectedPrice: selection.category === "ethernet-cable"
                  ? (products[i].lengthPrices?.[selection.selectedLength] || 0) * newQuantity
                  : (products[i].price || 0) * newQuantity,
              };
            }
            return selection;
          })
        );
    };
    
    const handleLengthSelection = (index, length) => {
        setSelections((prevSelections) =>
          prevSelections.map((selection, i) => {
            if (i === index) {
              if (selection.category === "ethernet-cable") {
                const isSelected = selection.isSelected && selection.selectedLength === length;
                return {
                  ...selection,
                  selectedLength: isSelected ? 10 : length,
                  isSelected: !isSelected,
                  selectedPrice: !isSelected
                    ? products[i].lengthPrices?.[length] * selection.quantity || 0
                    : products[i].lengthPrices?.[10] * selection.quantity || 0,
                };
              }
              return selection;
            }
            return selection;
          })
        );
    };
    
    const handleCheckboxChange = (item) => {
      setCheckedItems((prevCheckedItems) => {
        if (prevCheckedItems.includes(item.id)) {
          return prevCheckedItems.filter((id) => id !== item.id);
        } else {
          return [...prevCheckedItems, item.id];
        }
      });
    };
    
    const selectAllItems = (event) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked);
        if (isChecked) {
          setCheckedItems(cart.map((item) => item.id));
        } else {
          setCheckedItems([]);
        }
    };
    
    const printPayment = () => {
      console.log('Printing payment details:', checkedItems);
      console.log(cart);
    };
    
    const addProductToCart = (product) => {
        const uniqueId = `${product.id}-${Date.now()}`;
        const newCartItem = {
            id: uniqueId,
            productId: product.id,
            name: product.name,
            quantity: product.quantity,
            selectedLength: product.category === "ethernet-cable" ? product.selectedLength : null,
            totalAmount: product.selectedPrice,
            category: product.category,
            image: product.image,
        };
    
        setCart((prevCart) => [...prevCart, newCartItem]);
    
        setTotalAmount((prevTotal) => prevTotal + product.selectedPrice);
    
        toast.success('Product added to cart', {
            position: "top-right",
            autoClose: 400,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    
        setProducts((prevProducts) =>
            prevProducts.map((item) =>
                item.id === product.id
                    ? { ...item, availableStock: item.availableStock - product.quantity }
                    : item
            )
        );
    
        setSelections((prevSelections) =>
            prevSelections.map((item) =>
                item.id === product.id
                    ? {
                        ...item,
                        quantity: 1,
                        selectedLength: product.category === "ethernet-cable" ? 10 : null,
                        isSelected: false,
                        selectedPrice: product.category === "ethernet-cable"
                            ? (products.find((p) => p.id === product.id).lengthPrices[10] || 0)
                            : (products.find((p) => p.id === product.id).price || 0),
                    }
                    : item
            )
        );
    };
    
    const removeItem = (id) => {
        setCart((prevCart) => {
          const updatedCart = prevCart.filter((item) => item.id !== id);
          localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
          return updatedCart;
        });
    
        // Update the total amount after removing the item
        setTotalAmount((prevTotal) => {
          const itemToRemove = cart.find((item) => item.id === id);
          return prevTotal - (itemToRemove ? itemToRemove.totalAmount : 0);
        });
    
        // Update the selectedTotal if the removed item was checked
        setSelectedTotal((prevTotal) => {
          const itemToRemove = cart.find((item) => item.id === id);
          if (itemToRemove && checkedItems.includes(itemToRemove.id)) {
            return prevTotal - itemToRemove.totalAmount;
          }
          return prevTotal;
        });
    
        // Update checkedItems if the removed item was checked
        setCheckedItems((prevCheckedItems) => prevCheckedItems.filter((checkedId) => checkedId !== id));
    };
    
    const removeSelectedItems = () => {
        setCart((prevCart) => {
          const updatedCart = prevCart.filter((item) => !checkedItems.includes(item.id));
          localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
          return updatedCart;
        });
    
        setTotalAmount((prevTotal) => {
          return prevTotal - selectedTotal;
        });
    
        setSelectedTotal(0);
        setCheckedItems([]);
        setSelectAll(false);
    };
    
    const handleFormSubmit = (event) => {
        event.preventDefault();
        selections.forEach((product) => {
            if (product.quantity > 0) {
                addProductToCart(product);
            }
        });
    };
    
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };
    
    const filteredProducts = products.filter((product) => {
        return (
          (selectedCategory === "All" || product.category === selectedCategory.toLowerCase().replace(" ", "-")) &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    
    useEffect(() => {
      const total = checkedItems.reduce((sum, id) => {
        const item = cart.find((product) => product.id === id);
        return sum + (item ? item.totalAmount : 0);
      }, 0);
      setSelectedTotal(total);
    }, [checkedItems, cart]);

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
                                                                placeholder="Quick search by name"
                                                                value={searchTerm}
                                                                onChange={handleSearchChange}
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
																Category
															</a>
															<div className="dropdown-menu dropdown-menu-end">
																<ul className="link-list-opt no-bdr">
                                                                    {categories.map((category) => (
                                                                        <li key={category}>
                                                                            <a href="#" onClick={() => handleCategoryChange(category)}>
                                                                            <span>{category}</span>
                                                                            </a>
                                                                        </li>
                                                                    ))}
																</ul>
															</div>
														</div>
													</li>
													<li
														data-bs-toggle="modal"
														data-bs-target="#modalTop"
														className="nk-block-tools-opt"
													>
														<a
															href="#"
															data-target="addProduct"
															className="toggle btn btn-icon btn-primary d-md-none"
														>
															<em className="icon ni ni-cart"></em>
														</a>
														<a
															href="#"
															data-target="addProduct"
															className="toggle btn btn-primary d-none d-md-inline-flex"
														>
															<em className="icon ni ni-cart"></em>
															<span>View Cart</span>
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
                            <form onSubmit={handleFormSubmit}>
                                {isLoading ? (
                                "Loading..."
                                ) : (
                                    <div className="nk-block">
                                        <div className="row g-gs">
                                        {filteredProducts.map((product, index) => (
                                            <div key={product.id} className="col-xxl-3 col-lg-4 col-sm-6">
                                            <div className="card card-bordered product-card">
                                                <div className="product-thumb">
                                                <a href="html/product-details.html">
                                                    <img className="card-img-top" src={product.image} alt={product.name} />
                                                </a>
                                                <ul className="product-badges">
                                                    <li>
                                                    <span className="badge bg-success">{product.availability}</span>
                                                    </li>
                                                </ul>
                                                <ul className="product-actions">
                                                    <li>
                                                    <a href="#"><em className="icon ni ni-heart"></em></a>
                                                    </li>
                                                </ul>
                                                </div>
                                                <div className="card-inner">
                                                <h5 className="product-title">{product.name}</h5>
                                                <ul className="preview-list d-flex justify-content-between">
                                                    <li className="preview-item">
                                                    <span className="badge bg-outline-danger">&#x20B1;{selections[index].selectedPrice}</span>
                                                    </li>
                                                    <li className="preview-item">
                                                    <span className="badge bg-outline-info">Stock: {product.availableStock}</span>
                                                    </li>
                                                </ul>
                                                {product.category === "ethernet-cable" && (
                                                    <>
                                                    <p className="m-0">Specification:</p>
                                                    <ul className="product-tags">
                                                        {[10, 20, 30, 40, 50, 100].map((length) => (
                                                        <button
                                                            key={length}
                                                            type="button"
                                                            className="btn"
                                                            data-bs-toggle="button"
                                                            onClick={() => handleLengthSelection(index, length)}
                                                        >
                                                            {length} m
                                                        </button>
                                                        ))}
                                                    </ul>
                                                    </>
                                                )}
                                                <div className="m-3 d-flex justify-content-between">
                                                    <div className="preview-title">Quantity:</div>
                                                    <div className="btn-group btn-group-sm">
                                                        <button
                                                        onClick={() => handleQuantityChange(index, -1)}
                                                        type="button"
                                                        className="btn btn-outline-primary"
                                                        disabled={selections[index].quantity === 1}
                                                        >
                                                        -
                                                        </button>
                                                        <button
                                                        type="button"
                                                        className="btn btn-outline-primary"
                                                        >
                                                        {selections[index].quantity}
                                                        </button>
                                                        <button
                                                        onClick={() => handleQuantityChange(index, 1)}
                                                        type="button"
                                                        className="btn btn-outline-primary"
                                                        >
                                                        +
                                                        </button>
                                                    </div>
                                                </div>
                                                <button
                                                    className="btn btn-primary btn-block mt-3"
                                                    type="button"
                                                    onClick={() => addProductToCart(product)}
                                                >
                                                    Add to Cart
                                                </button>
                                                </div>
                                            </div>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                )}
                            </form>
							<div className="modal fade" tabIndex="-1" id="modalTop">
								<div
									className="modal-dialog modal-lg modal-dialog-top"
									role="document"
								>
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title">Cart</h5>
											<a
												href="#"
												className="close"
												data-bs-dismiss="modal"
												aria-label="Close"
											>
												<em className="icon ni ni-cross"></em>
											</a>
										</div>
										<div className="modal-body">
											<div className="nk-tb-list is-separate mb-3">
												<div className="nk-tb-item nk-tb-head">
													<div className="nk-tb-col nk-tb-col-check">
														<div className="custom-control custom-control-sm custom-checkbox notext">
															<input
																type="checkbox"
																className="custom-control-input"
																id="selectAll"
                                                                checked={selectAll}
                                                                onChange={selectAllItems}
															/>
															<label
																className="custom-control-label"
																htmlFor="selectAll"
															></label>
														</div>
													</div>
													<div className="nk-tb-col tb-col-sm">
														<span>Name</span>
													</div>
													<div className="nk-tb-col">
														<span>Length</span>
													</div>
													<div className="nk-tb-col">
														<span>Price</span>
													</div>
													<div className="nk-tb-col">
														<span>Quantity</span>
													</div>
													<div className="nk-tb-col tb-col-md">
														<span>Category</span>
													</div>
													<div className="nk-tb-col tb-col-md">
														<em className="tb-asterisk icon ni ni-star-round"></em>
													</div>
													<div className="nk-tb-col nk-tb-col-tools">
														<ul className="nk-tb-actions gx-1 my-n1">
															<li className="me-n1">
																<div className="dropdown">
																	<a
																		href="#"
																		className="dropdown-toggle btn btn-icon btn-trigger"
																		data-bs-toggle="dropdown"
																	>
																		<em className="icon ni ni-more-h"></em>
																	</a>
																	<div className="dropdown-menu dropdown-menu-end">
																		<ul className="link-list-opt no-bdr">
																			<li>
																				<a href="#">
																					<em className="icon ni ni-edit"></em>
																					<span>Edit Selected</span>
																				</a>
																			</li>
																			<li  >
																				<a href="#" onClick={removeSelectedItems}>
																					<em className="icon ni ni-trash"></em>
																					<span>Remove Selected</span>
																				</a>
																			</li>
																			<li>
																				<a href="#">
																					<em className="icon ni ni-bar-c"></em>
																					<span>Update Stock</span>
																				</a>
																			</li>
																			<li>
																				<a href="#">
																					<em className="icon ni ni-invest"></em>
																					<span>Update Price</span>
																				</a>
																			</li>
																		</ul>
																	</div>
																</div>
															</li>
														</ul>
													</div>
												</div>
                                                {cart.length === 0 ? (
                                                    "No items in cart"
                                                ) : (
                                                    cart.map((item, index) => (
                                                        <div key={index} className="nk-tb-item">
                                                            <div className="nk-tb-col nk-tb-col-check">
                                                                <div className="custom-control custom-control-sm custom-checkbox notext">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="custom-control-input"
                                                                        id={`pid${index}`}
                                                                        checked={checkedItems.includes(item.id)}
                                                                        onChange={() => handleCheckboxChange(item)}
                                                                    />
                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`pid${index}`}
                                                                    ></label>
                                                                </div>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-sm">
                                                                <span className="tb-product">
                                                                    <img src={item.image} alt={item.name} className="thumb" />
                                                                    <span className="title">{item.name}</span>
                                                                </span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="tb-sub">{item.category === "ethernet-cable" ? `${item.selectedLength}m` : "none" }</span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="tb-lead">$ {item.totalAmount}</span>
                                                            </div>
                                                            <div className="nk-tb-col">
                                                                <span className="tb-sub">{item.quantity}</span>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-md">
                                                                <span className="tb-sub">{item.category}</span>
                                                            </div>
                                                            <div className="nk-tb-col tb-col-md">
                                                                <div className="asterisk tb-asterisk">
                                                                    <a href="#">
                                                                        <em className="asterisk-off icon ni ni-star"></em>
                                                                        <em className="asterisk-on icon ni ni-star-fill"></em>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="nk-tb-col nk-tb-col-tools">
                                                                <ul className="nk-tb-actions gx-1 my-n1">
                                                                    <li className="me-n1">
                                                                        <div className="dropdown">
                                                                            <a
                                                                                href="#"
                                                                                className="dropdown-toggle btn btn-icon btn-trigger"
                                                                                data-bs-toggle="dropdown"
                                                                            >
                                                                                <em className="icon ni ni-more-h"></em>
                                                                            </a>
                                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                                <ul className="link-list-opt no-bdr">
                                                                                    <li>
                                                                                        <a href="#">
                                                                                            <em className="icon ni ni-edit"></em>
                                                                                            <span>Edit Product</span>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li >
                                                                                        <a >
                                                                                            <em className="icon ni ni-eye"></em>
                                                                                            <span>View Product</span>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#">
                                                                                            <em className="icon ni ni-activity-round"></em>
                                                                                            <span>Product Orders</span>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li onClick={() => removeItem(item.id)} >
                                                                                        <a href="#">
                                                                                            <em className="icon ni ni-trash"></em>
                                                                                            <span>Remove Product</span>
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
											</div>
										</div>
										<div className="modal-footer bg-light">
                                            <span className="sub-text">Selected Total: $ {selectedTotal}</span>
                                            <button className="btn btn-primary" onClick={printPayment}>
                                                Print Payment
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
	);
};

export default Menu;
