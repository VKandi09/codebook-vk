function getSessionToken() {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const id = JSON.parse(sessionStorage.getItem("cbid"));

    return { token, id };
}

export async function getUser() {
    const browserData = getSessionToken();
    const response = await fetch(`${process.env.REACT_APP_HOST}/600/users/${browserData.id}`, {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization : `Bearer ${browserData.token}`}
    });
    if(!response.ok) {
        throw { message: response.statusText, status: response.status };
    }

    const data = await response.json();
    return data;
}

export async function getUserOrders() {
    const browserData = getSessionToken();
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.id=${browserData.id}`, {
            method: "GET",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`}
    });
    if(!response.ok) {
        throw { message: response.statusText, status: response.status };
    }
    const data = await response.json();
    return data;
}

export async function createOrder(cartList, total, user) {
    const browserData = getSessionToken();
    const order = {
        cartList: cartList,
        amount_paid: total,
        quantity: cartList.length,
        user: {
            name: user.name,
            email: user.email,
            id: user.id,
        }
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders`, {
        method: "POST",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`},
        body: JSON.stringify(order)
    });

    if(!response.ok) {
        throw { message: response.statusText, status: response.status };
    }
    const data = await response.json();
    return data;
}