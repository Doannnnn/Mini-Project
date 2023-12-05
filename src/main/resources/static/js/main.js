const bodyProduct = $("#btProduct");
const fullName = "Trần Công Đoàn";
let pageCurrent = 0;
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

    filterProducts()

   const cartDetails = await fetchAllCartDetail();

    await updateCartUI(cartDetails)
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

const renderProduct = (obj) => {
    return `
    <div class="col-md-3 mb-4">
        <div class="card d-flex align-items-center pt-2"><img
            src="${obj.image.url}"
            class="card-image-top" alt="" style="width: 180px; height: 100px">
            <div class="card-body">
                <p class="fw-bolder">${obj.title}</p>
                <div class="d-flex align-items-center mb-2">
                    <div class="me-1"><svg stroke="currentColor" fill="currentColor"
                        stroke-width="0" viewBox="0 0 576 512" color="yellow" height="1em"
                        width="1em" xmlns="http://www.w3.org/2000/svg" style="color: yellow;">
                        <path
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
                        </path>
                    </svg><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                        viewBox="0 0 576 512" color="yellow" height="1em" width="1em"
                        xmlns="http://www.w3.org/2000/svg" style="color: yellow;">
                            <path
                                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
                            </path>
                        </svg><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                            viewBox="0 0 576 512" color="yellow" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg" style="color: yellow;">
                            <path
                                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
                            </path>
                        </svg><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                            viewBox="0 0 576 512" color="yellow" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg" style="color: yellow;">
                            <path
                                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
                            </path>
                        </svg></div>
                    <div class="fs-10">(123 reviewer)</div>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                    <div><del class="line-through me-2">$ ${obj.oldPrice}</del><span>$ ${obj.newPrice}</span></div>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0"
                        viewBox="0 0 576 512" class="btn-cart" height="20" width="20"
                        xmlns="http://www.w3.org/2000/svg" onclick="addToCart(${obj.id})">
                        <path
                            d="M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994-29.823-.429-54.35-24.631-55.155-54.447-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938-28.54-1.325-51.751-24.385-53.251-52.917-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320zM403.029 192H360v-60c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v60h-43.029c-10.691 0-16.045 12.926-8.485 20.485l67.029 67.029c4.686 4.686 12.284 4.686 16.971 0l67.029-67.029c7.559-7.559 2.205-20.485-8.486-20.485z">
                        </path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
    `;
};

$('input[name="category"], input[name="price"], input[name="color"]').on('change', function (){
    pageCurrent = 0;
    filterProducts();
});

$('.btn-outline-secondary').on('click', function () {
    $(this).toggleClass('active').siblings().removeClass('active');
    pageCurrent = 0;
    filterProducts();
});

$(`input[type="search"]`).on('input', filterProducts);

function filterProducts() {
    const selectedCategory = $('input[name="category"]:checked').val().toLowerCase();
    const selectedPrice = $('input[name="price"]:checked').val();
    const selectedColor = $('input[name="color"]:checked').val().toLowerCase();
    const selectedRecommended = $('.btn-outline-secondary.active').text().toLowerCase();
    const searchValue = $('input[type="search"]').val().toLowerCase();

    $.ajax({
        url: `http://localhost:8080/api/product/filtered`,
        method: 'GET',
        data: {
            category: selectedCategory,
            price: selectedPrice,
            color: selectedColor,
            recommended: selectedRecommended,
            search: searchValue,
            page: pageCurrent,
            size: 28
        },
        dataType: 'json',
        success: function (filteredProducts) {
            bodyProduct.empty();

            filteredProducts.content.forEach(item => {
                const str = renderProduct(item);
                bodyProduct.append(str);
            });

            renderPagination(filteredProducts.totalPages, pageCurrent)
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });
}

// function renderPagination(totalPages, currentPage) {
//     const paginationContainer = $('.pagination');
//     paginationContainer.empty();
//
//     paginationContainer.append(`
//         <li class="page-item ${currentPage === 0 ? 'disabled' : ''}">
//             <a class="page-link" href="#" tabindex="-1" aria-disabled="true" data-page="${currentPage - 1}">Previous</a>
//         </li>
//     `);
//
//     const maxVisiblePages = 2;
//     const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
//
//     if (totalPages <= maxVisiblePages + 2) {
//         for (let i = 0; i < totalPages; i++) {
//             paginationContainer.append(`
//                 <li class="page-item ${currentPage === i ? 'active' : ''}">
//                     <a class="page-link" href="#" data-page="${i}">${i + 1}</a>
//                 </li>
//             `);
//         }
//     } else {
//         const startPage = Math.max(0, currentPage - halfMaxVisiblePages);
//         const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages);
//
//         if (startPage > 0) {
//             paginationContainer.append(`
//                 <li class="page-item">
//                     <a class="page-link" href="#" data-page="0">1</a>
//                 </li>
//                 <li class="page-item disabled">
//                     <span class="page-link">...</span>
//                 </li>
//             `);
//         }
//
//         for (let i = startPage; i <= endPage; i++) {
//             paginationContainer.append(`
//                 <li class="page-item ${currentPage === i ? 'active' : ''}">
//                     <a class="page-link" href="#" data-page="${i}">${i + 1}</a>
//                 </li>
//             `);
//         }
//
//         if (endPage < totalPages - 1) {
//             paginationContainer.append(`
//                 <li class="page-item disabled">
//                     <span class="page-link">...</span>
//                 </li>
//                 <li class="page-item">
//                     <a class="page-link" href="#" data-page="${totalPages - 1}">${totalPages}</a>
//                 </li>
//             `);
//         }
//     }
//
//     paginationContainer.append(`
//         <li class="page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}">
//             <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
//         </li>
//     `);
//
//     paginationContainer.find('.page-link').on('click', function (e) {
//         e.preventDefault();
//         const page = parseInt($(this).data('page'));
//         if (!isNaN(page)) {
//
//             pageCurrent = page;
//             filterProducts();
//         }
//     });
// }

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

function addToCart(productId) {
    const quantity = "1";

    const cardDetail = {
        quantity,
        productId,
        fullName
    };

    Toast.close();

    $.ajax({
        url: `http://localhost:8080/api/cart-detail`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(cardDetail)
    })
        .done(async (response) => {
            Toast.fire({
                icon: "success",
                title: `${response.product.title} added to cart`
            });

            const cartDetails = await fetchAllCartDetail();

            await updateCartUI(cartDetails)
        })
        .fail((error) => {
            Toast.fire({
                icon: "error",
                title: `added to cart failed`
            });
        });
}




