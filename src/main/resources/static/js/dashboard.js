const fullName = "Trần Công Đoàn";
const bodyOrderList = $("#tbOrderList");
const bodyProductList = $("#tbProductList");

$(async () => {

    await getAllOrder();

    await getAllProductList();
})

const fetchAllOrder = async () => {
    try {
        return await $.ajax({
            url: `http://localhost:8080/api/order/${fullName}`,
            method: "GET",
            dataType: "json"
        });
    } catch (error) {
        console.error("Error:", error);
    }
};

const renderOrder = (obj) => {
    return `
                <tr>
                    <td class="text-end align-middle">${obj.orderDate}</td>
                    <td class="text-end align-middle">${obj.orderDetails.length}</td>
                    <td class="text-end align-middle">${"$" + obj.total}</td>
                    <td class="text-end align-middle">${obj.shipping}</td>
                    <td class="text-end align-middle">${"$" + obj.total}</td>
                    <td class="text-end align-middle"><span class="badge bg-secondary">${obj.status}</span></td>
                    <td class="text-start align-middle">${obj.customer.fullName}</td>
                    <td class="text-end align-middle">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" onclick="detailOrder(${obj.id})"
                             viewBox="0 0 24 24" color="green" role="button" height="20" width="20"
                             xmlns="http://www.w3.org/2000/svg" style="color: green;">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M13 7h9v2h-9zM13 15h9v2h-9zM16 11h6v2h-6zM13 12L8 7v4H2v2h6v4z"></path>
                        </svg>
                    </td>
                </tr>
            `;
};

const getAllOrder = async () => {
    const orders = await fetchAllOrder();

    orders.forEach(item => {
        const orderStr = renderOrder(item);
        bodyOrderList.append(orderStr);
    });
};

function detailOrder(orderId) {
    const orderManagementDiv = $('.col-md-12');
    const orderDetail = $('.col-lg-5');

    if (orderManagementDiv.length > 0) {
        $.ajax({
            url: `http://localhost:8080/api/order/${orderId}`,
            method: 'PUT',
        })
            .done((obj) => {
                const orderDetailsHTML = obj.orderDetails.map(detail => `
                    <tr>
                        <td style="width: 250px;">
                            <div class="d-flex align-items-center">
                                <img class="me-2" src="${detail.product.image.url}" style="width: 50px;">
                                ${detail.product.title}
                            </div>
                        </td>
                        <td class="text-end align-middle">${detail.quantityProduct}</td>
                        <td class="text-end align-middle">${'$' + detail.product.newPrice}</td>
                        <td class="text-end align-middle fw-bolder">${'$' + detail.subtotal}</td>
                    </tr>
                `).join('');

                const html = `
                                        <div class="d-flex align-items-center justify-content-between border-bottom"><h5>Order
                                            details</h5><span role="button" class="btn-close" onclick="closeOrderDetail()" "></span></div>
                                        <div class="my-2 border-bottom"><h6>Order Information</h6>
                                            <div class="d-flex justify-content-between mb-2"><span>Subtotal</span><span
                                                class="fw-bolder">${'$' + obj.total}</span></div>
                                            <div class="d-flex justify-content-between mb-2"><span>Shipping</span><span
                                                class="fw-bolder">${obj.shipping}</span></div>
                                            <div class="d-flex justify-content-between mb-2"><span>Total</span><span
                                                class="fw-bolder">${'$' + obj.total}</span></div>
                                        </div>
                                        <div class="my-2 border-bottom"><h6>Customer Information</h6>
                                            <div class="d-flex justify-content-between mb-2"><span>Fullname</span><span
                                                class="fw-bolder">${obj.customer.fullName}</span></div>
                                            <div class="d-flex justify-content-between mb-2"><span>Email</span><span
                                                class="fw-bolder">${obj.customer.email}</span></div>
                                            <div class="d-flex justify-content-between mb-2"><span>Mobile</span><span
                                                class="fw-bolder">${obj.customer.phone}</span></div>
                                            <div class="d-flex justify-content-between mb-2"><span>Address</span><span
                                                class="fw-bolder">${obj.customer.address}</span></div>
                                        </div>
                                        <div class="my-2 border-bottom"><h6>Order details</h6>
                                            <table class="table table-striped">
                                                <tbody>
                                                    ${orderDetailsHTML}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    `;
                orderDetail.html(html);

                orderManagementDiv.removeClass('col-md-12').addClass('col-md-7');
                orderDetail.css('display', 'block');
            })
            .fail((error) => {
                console.error('Error fetching order detail:', error);
            });
    }
}

function closeOrderDetail() {
    const orderManagementDiv = $('.col-md-7');
    const orderDetail = $('.col-lg-5.border.p-2.rounded');

    if (orderManagementDiv.length > 0) {
        orderManagementDiv.removeClass('col-md-7').addClass('col-md-12');
        orderDetail.css('display', 'none');
    }
}

const fetchAllProductList = async () => {
    try {
        return await $.ajax({
            url: "http://localhost:8080/api/product",
            method: "GET",
            dataType: "json"
        });
    } catch (error) {
        console.error("Error:", error);
    }
};

const renderProductList = (obj) => {
    return`
                <tr>
                    <td class="text-start align-middle" style="min-width: 250px;">
                        <div class="d-flex align-items-center"><img
                            src="${obj.image.url}" alt=""
                            style="width: 50px;"><span class="ms-2">${obj.title}</span></div>
                    </td>
                    <td class="text-start align-middle">
                        <span class="badge px-2 py-1"
                              style="background-color: ${obj.color.name}; ${obj.color.name === 'White' ? 'color: black;' : ''}">
                            ${obj.color.name}
                        </span>
                    </td>
                    <td class="text-start align-middle">${obj.category.name}</td>
                    <td class="text-start align-middle">${obj.company.name}</td>
                    <td class="text-end align-middle">
                        <div class="d-flex flex-column">
                            <del>${'$' + obj.oldPrice}</del>
                            <span>${'$' + obj.newPrice}</span></div>
                    </td>
                    <td class="text-center align-middle">
                        <div class="d-flex align-items-center justify-content-center">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                 viewBox="0 0 576 512" class="text-success me-1" height="1em" width="1em"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path>
                            </svg>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                 viewBox="0 0 448 512" class="text-danger" height="1em" width="1em"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                            </svg>
                        </div>
                    </td>
                </tr>
            `;
};

const getAllProductList = async () => {
    const products = await fetchAllProductList();

    products.forEach(item => {
        const str = renderProductList(item);
        bodyProductList.append(str);
    });
};

function showModalCreate(){
    $('.product-form').css('display', 'block');
}

function closeModalCreate(){
    $('.product-form').css('display', 'none');
}






