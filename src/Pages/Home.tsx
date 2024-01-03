import React, { useEffect,useCallback, useState, ChangeEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { ProductList } from "../Actions/Actions"
import { IArticle } from "../Reducers/Reducer"
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import { MenuOutlined, SendRounded } from "@mui/icons-material"
import { SideNav } from "../Components/SideNav"
import { FETCH } from "../Actions/constant";
import { ProductList } from "../Actions/Actions";
import { Menu } from "@mui/material";





const Home = () =>
{
    const [dataFetched, setDataFetched] = useState(false);
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const dispatch=useDispatch()
    const data =useSelector((store:any) => store.Data)
    const toggle=document.querySelector(".toggleMenu")
    toggle?.addEventListener("click",() => {
        document.querySelector(".side-nav")?.classList.toggle("active")
    })
    useEffect(() => {
        if (data.length === 0 && !dataFetched) {
            dispatch(ProductList());
            setDataFetched(true)
        }
    }, [dispatch,data,dataFetched]);
    const handleToggleMenu = () => {
        setIsSidebarActive(prevState => !prevState);
    }
    console.log(data)
    return (
        <div>
           
            <SideNav isActive={isSidebarActive} />
            <div className="home-body">
                <div className="site-name-wrapper">
                    <div className="header-wrapper">
                    <div className="toggleMenu" id="toggle-menu" onClick={handleToggleMenu}>
                        <MenuOutlined className="icon"/>
                        </div>
                    </div>
                    <div className="header-wrapper">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUKZLtt01kq_yX59cAyArtyA-GTy1w9L99ww&usqp=CAU" alt="" />
                    <h3>Banking Application</h3>
                    </div>
                </div>
                <div className="tabular--wrapper">
                    <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Credit/Debit</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    
                    data.map((product:IArticle,index:number) => {
                        return (
                            <tr  key={index}>
                            <td>{product.Amount}</td>
                            <td>{product.Name}</td>
                            <td>{product.Date}</td>
                            <td>{product.CreditOrDebit}</td>
                            </tr>
                        )
                    })
                }
                    </tbody>
                </table>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Home