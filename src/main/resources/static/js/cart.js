const bodyCartDetail = $("#tbCartDetail");
const fullName = "Trần Công Đoàn";
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

$(async () => {

    await getAllCartDetail();

    await informationCustomer();

})
const fetchAllCartDetail = async () => {
    try {
        return await $.ajax({
            url: `http://localhost:8080/api/cart-detail/${fullName}`,
            method: "GET",
            dataType: "json"
        });
    } catch (error) {
        console.error("Error:", error);
    }
};

const informationCustomer = async () => {

    await $.ajax({
        url: `http://localhost:8080/api/cart/${fullName}`,
        method: "GET",
        dataType: "json"
    })
        .done(async (response) => {
            $('#fullName').val(response.customer.fullName);
            $('#email').val(response.customer.email);
            $('#address').val(response.customer.address);
            $('#phone').val(response.customer.phone);
        })
        .fail((error) => {
            Toast.fire({
                icon: "error",
                title: `has increment quantity failed`
            });
        });

};

const renderCartDetail = (obj) => {
    return`
            <tr id="tr_${obj.id}">
                <td style="max-width: 200px;">
                    <div class="d-flex align-items-center"><img class="product-image" src="${obj.product.image.url}" alt="">
                        <div class="d-inline">
                            <div class="d-block fw-bolder mb-2">${obj.product.title}</div>
                            <div class="badge py-2" style="background-color: ${obj.product.color.name};">${obj.product.color.name}</div>
                        </div>
                    </div>
                </td>
                <td class="text-end">${"$" + obj.product.newPrice}</td>
                <td>
                    <div class="cart-quantity-wrap">
                        <div class="cart-quantity">
                        <span onclick="reduceQuantity(${obj.id})">-</span>
                        <span id="quantityProduct">${obj.quantity}</span>
                        <span onclick="increaseQuantity(${obj.id})">+</span>
                        </div>
                    </div>
                </td>
                <td class="text-end" id="totalAmount">${"$" + obj.totalAmount}</td>
                <td>
                    <div class="action-wrap">
                        <span class="btn-remove" onclick="removeCart(${obj.id})">×</span>
                    </div>
                </td>
            </tr>
    `;
};

const getAllCartDetail = async () => {
    const cartDetails = await fetchAllCartDetail();

    updateCartUI(cartDetails)

    cartDetails.forEach(item => {
        const str = renderCartDetail(item);
        bodyCartDetail.append(str);
    });

    calculateTotal();
};

function calculateTotal() {
    let total = 0;

    $('#tbCartDetail tr').each(function () {
        const totalAmountText = $(this).find('#totalAmount').text();
        const totalAmount = parseFloat(totalAmountText.replace('$', ''));

        if (!isNaN(totalAmount)) {
            total += totalAmount;
        }
    });

    $('#subtotal').text("$" + total);
    $('#total').text("$" + total);
}

function updateCartUI(cartDetails) {
    const cartElement = $('#cart');

    const itemCount = cartDetails.length;

    if (itemCount > 0) {
        cartElement.html(`
            <a class="position-relative me-3" href="/cart">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="me-2" role="button" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path
                            d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z">
                    </path>
                </svg>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${itemCount}</span>
            </a>
            <a href="/dashboard/order-list">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0"
                     viewBox="0 0 448 512" role="button" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path
                            d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
                    </path>
                </svg>
            </a>
        `);
    } else {
        cartElement.html(`
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="me-2" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
               <path
                      d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z">
               </path>
            </svg>
            <a href="/dashboard/order-list">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0"
                     viewBox="0 0 448 512" role="button" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path
                            d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
                    </path>
                </svg>
            </a>
        `);
    }
}

function removeCart(cartDetailId) {
    Swal.fire({
        title: 'Confirm remove cart item',
        text: 'Are you sure to remove this cart item?',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `http://localhost:8080/api/cart-detail/${cartDetailId}`,
                method: 'DELETE',
            })
                .done(async (response) => {
                    const deleteRow = $('#tr_' + cartDetailId);
                    deleteRow.remove();

                    const cartDetails = await fetchAllCartDetail();
                    await updateCartUI(cartDetails)
                    calculateTotal();

                    Toast.fire({
                        icon: "info",
                        title: `removed successfully`
                    });
                })
                .fail((error) => {
                    Toast.fire({
                        icon: "error",
                        title: `removed failed`
                    });
                });
        }
    });
}

function reduceQuantity(cartDetailId) {
    const row = $('#tr_' + cartDetailId);
    const currentQuantity = parseInt(row.find('#quantityProduct').text(), 10);
    if (currentQuantity === 1){
        return;
    }
    const newQuantity = currentQuantity - 1;

    $.ajax({
        url: `http://localhost:8080/api/cart-detail/${cartDetailId}`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(newQuantity),
    })
        .done(async (response) => {
        Toast.fire({
            icon: "success",
            title: `${response.product.title} has decrement quantity`
        });

            const str = renderCartDetail(response);
            row.replaceWith(str);
            calculateTotal()
    })
        .fail((error) => {
            Toast.fire({
                icon: "error",
                title: `has decrement quantity failed`
            });
        });
}

function increaseQuantity(cartDetailId) {
    const row = $('#tr_' + cartDetailId);
    const currentQuantity = parseInt(row.find('#quantityProduct').text(), 10);
    const newQuantity = currentQuantity + 1;

    $.ajax({
        url: `http://localhost:8080/api/cart-detail/${cartDetailId}`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(newQuantity),
    })
        .done(async (response) => {
            Toast.fire({
                icon: "success",
                title: `${response.product.title} has increment quantity`
            });

            const str = renderCartDetail(response);
            row.replaceWith(str);
            calculateTotal()
        })
        .fail((error) => {
            Toast.fire({
                icon: "error",
                title: `has increment quantity failed`
            });
        });
}

$('#buttonCheckOut').on('click', () => {
    Swal.fire({
        title: 'Order confirmation',
        text: 'Are you sure to order these products?',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {

            const shipping = $('#shipping').text();
            const totalText = $('#total').text();
            const total = (totalText.replace('$', ''));

            const order = {
                shipping,
                total,
                fullName
            };

            $.ajax({
                url: `http://localhost:8080/api/order`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(order)
            })
                .done(async (response) => {
                    Toast.fire({
                        icon: "success",
                        title: `Order successfully`
                    });

                    bodyCartDetail.empty();
                    calculateTotal();
                    const cartDetails = await fetchAllCartDetail();
                    await updateCartUI(cartDetails)
                })
                .fail((error) => {
                    Toast.fire({
                        icon: "error",
                        title: `Order failed`
                    });
                });
        }
    });
});



