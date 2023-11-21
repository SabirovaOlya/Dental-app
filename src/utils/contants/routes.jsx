import Home from "../../pages/home/Home"
import Employees from "../../pages/employees/list/List"
import EmployeeForm from "../../pages/employees/add/Form"
import EmployeeEdit from "../../pages/employees/edit/Edit"
import EmployeeSingle from "../../pages/employees/single/Single"
import Jobs from "../../pages/jobs/list/List"
import JobForm from "../../pages/jobs/add/Form"
import JobEdit from "../../pages/jobs/edit/Edit"
import JobSingle from "../../pages/jobs/single/Single"
import Orders from "../../pages/orders/list/List"
import OrderForm from "../../pages/orders/add/Form"
import OrderEdit from "../../pages/orders/edit/Edit"
import OrderSingle from "../../pages/orders/single/Single"
import Prices from "../../pages/prices/list/List"
import PriceForm from "../../pages/prices/add/Form"
import PriceEdit from "../../pages/prices/edit/Edit"
import PriceSingle from "../../pages/prices/single/Single"

export const routes = [
    {
        id: 1,
        path: '/',
        element: <Home />
    },
    {
        id: 2,
        path: '/employee',
        element: <Employees />
    },
    {
        id: 3,
        path: '/employee/form',
        element: <EmployeeForm />
    },
    {
        id: 4,
        path: '/employee/edit/:id',
        element: <EmployeeEdit />
    },
    {
        id: 5,
        path: '/employee/single/:id',
        element: <EmployeeSingle />
    },
    {
        id: 6,
        path: '/job',
        element: <Jobs />
    },
    {
        id: 7,
        path: '/job/form',
        element: <JobForm />
    },
    {
        id: 8,
        path: '/job/edit/:id',
        element: <JobEdit />
    },
    {
        id: 9,
        path: '/job/single/:id',
        element: <JobSingle />
    },
    {
        id: 10,
        path: '/order',
        element: <Orders />
    },
    {
        id: 11,
        path: '/order/form',
        element: <OrderForm />
    },
    {
        id: 12,
        path: '/order/edit/:id',
        element: <OrderEdit />
    },
    {
        id: 13,
        path: '/order/single/:id',
        element: <OrderSingle />
    },
    {
        id: 10,
        path: '/order',
        element: <Orders />
    },
    {
        id: 11,
        path: '/order/form',
        element: <OrderForm />
    },
    {
        id: 12,
        path: '/order/edit/:id',
        element: <OrderEdit />
    },
    {
        id: 13,
        path: '/order/single/:id',
        element: <OrderSingle />
    },
    {
        id: 14,
        path: '/price',
        element: <Prices />
    },
    {
        id: 15,
        path: '/price/form',
        element: <PriceForm />
    },
    {
        id: 16,
        path: '/price/edit/:id',
        element: <PriceEdit />
    },
    {
        id: 17,
        path: '/price/single/:id',
        element: <PriceSingle />
    }

]