import { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
// import data from './websiteData.json';
import axios from 'axios';

export const Dashboard = () => {

    const [menu, setMenu] = useState("dashboard");
    const [websites,setWebsites] = useState([]);
    const [siteName, setsiteName] = useState("");
    const dropOpt = [{label:"pending"}, {label:"review"}, {label:"completed"}];
    const [siteIndex, setsiteIndex] = useState("");
    const [uName, setUName] = useState("...");
    const [uUsrName, setUUsrName] = useState("...");
    const userId = localStorage.getItem("userId");
    const [pageId, setpageId] = useState("");
    const uicon = uName.charAt(0);
    const d = new Date();    

    const userData = async () => {
        try{
            await axios.get(`http://localhost:8000/api/user/fetch/${userId}`).then(
                function(res){
                    setUName(res.data.user.name);
                    setUUsrName(res.data.user.username);
                    setWebsites(res.data.user.pages);
                    console.log(res.data.user.pages);
                }
            )
        }catch(error){
            console.log(error);
        }
    }

    const addPages = async (name) => {
        try{
            await axios.post(`http://localhost:8000/api/user/createpage/${userId}`,{
                "pagename":name, "status":"pending", "jsonData":"nothing"
            }).then(
                function(res){
                    console.log(res.data);
                }
            )
        }catch(error){
            console.log(error);
        }
    } 

    const deletePages = async (pageid) => {
        try{
            await axios.delete(`http://localhost:8000/api/user/deletepage/${userId}/?pageid=${pageid}`).then(
                function(res){
                    console.log(res.data);
                }
            )
        }catch(error){
            console.log(error);
        }
    }

    const updateStat = async (e) => {
        e.preventDefault();
        const stat = e.target.value;
        try{
            await axios.put(`http://localhost:8000/api/user/updatepage/${pageId}/?status=${stat}`).then(
                function(res){
                    console.log(res.data);
                }
            )
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
       userData();
    });

    const showInput = () => {
    let btn = document.getElementById("fa-plus");
    let inpWrapper = document.getElementById("inpWrapper");
    if(inpWrapper.style.display === 'flex'){
        btn.style.rotate = "0deg";
        inpWrapper.style.display = 'none';
    }
    else{
        btn.style.rotate = "45deg";
        inpWrapper.style.display = 'flex';
    }
    }

    function addSite(e){
        e.preventDefault();
        const formdata = new FormData(e.target);
        const dataentries = Object.fromEntries(formdata.entries());
        const siteName = Object.keys(dataentries).map(k=>dataentries[k]);
        addPages(siteName[0]);
        e.target.reset();
        showInput();
    }

   
    let sidebar = "d";
    sidebar = document.getElementById('dsidebar');
    let sidearrowR = document.getElementById('dsidearrowR');
    let sidearrowL = document.getElementById('dsidearrowL');
    const handleMenu = (a) => {
        if(a === 'open'){
            sidebar.style.left = '5px';
            sidearrowR.style.zIndex = '999';
            sidearrowL.style.zIndex = '1000';
        }
        if(a === 'close'){
            sidebar.style.left= '-250px';
            sidearrowR.style.zIndex = '1000';
            sidearrowL.style.zIndex = '999';
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return(
        <section className={styles.ddashboard}>

            <div id='dsidebar' className={styles.dsidebar}>
            <div id='dsidearrowR' onClick={()=>handleMenu('open')} className={styles.dsidearrowR}>
            <i class="fa-solid fa-arrow-right"></i>
            </div>
            <div id='dsidearrowL' onClick={()=>handleMenu('close')} className={styles.dsidearrowL}>
            <i class="fa-solid fa-arrow-left"></i>
            </div>
                <div className={styles.dlogo}>
                    <strong>BuildBox</strong>
                </div>
                <div className={styles.dsidebarMenu}>
                    <h1 id='dashboard' className={`${menu==='dashboard'?'dashboard_dmenuActive__h9h8d':null}`} onClick={()=>setMenu("dashboard")}>Dashboard</h1>
                    <div id='dmenuWebsite' className={styles.dmenuWebsite}>
                    <div className={styles.dmenuWebsiteLabel}>
                        <h1>Webpages</h1>
                        <i id='fa-plus' onClick={()=>showInput()} class="fa-solid fa-plus"></i>
                    </div>
                    <form id='inpWrapper' className={styles.inpWrapper} onSubmit={addSite}>
                        <input name='siteInput' type="text" placeholder='Enter your website name' required="required"/>
                        <button type="submit">add</button>
                    </form>
                    <div id='dmenuWebsiteList' className={styles.dmenuWebsiteList}>
                        { websites.length > 0 ? websites.map((site,index) =>(
                            <div key={site.id} className={styles.dmenuWebsiteListRow}>
                            <p onClick={()=>{setMenu(`${site.pagename}`); setsiteName(`${site.pagename}`); setsiteIndex(index); setpageId(`${site._id}`)} }>{site.pagename}</p>
                            <div className={styles.dmenuWebsiteListIconRow}>
                                <i class="fa-solid fa-trash" onClick={()=>{deletePages(site._id)}}></i>
                            </div>
                        </div>
                        )): <h1 style={{color:"grey"}}>No data...</h1>}
                    </div>
                    </div>
                    <h1 className={`${menu==='settings'?'dashboard_dmenuActive__h9h8d':null}`}  onClick={()=>setMenu("settings")}>Settings</h1>
                </div>
            </div>

            {menu==="dashboard" && (<section className={styles.dcontainer}>
                <div className={styles.dgreet}>
                    <h1>Hello, {uName}</h1>
                    <p>{d.getDate()}/{d.getMonth()+1}/{d.getFullYear()}</p>
                    <h2 onClick={()=>setMenu("settings")}>{uicon.toUpperCase()}</h2>
                </div>
                <p className={styles.dgreetlower}>manage your projects here</p>
        
                <div className={styles.dactTable}>
                    <h1>Activity</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>page name</th>
                                <th>Status</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            { websites.length > 0 ? websites.map(site=>(
                             <tr>
                                <td>{site.pagename}</td>
                                <td>{site.status}</td>
                                <td><p className={styles.dactTableSD} onClick={()=>{setMenu(`${site.name}`); setsiteName(`${site.name}`);}}>see details</p></td>
                              </tr>
                            )) : <h1 style={{color:"grey"}}>No data...</h1>}
                        </tbody>
                    </table>
                </div>
            </section>)}

            {menu===siteName && (
                <section className={styles.Wwrappper}>
                 <div className={styles.Wwheadrowwrap}>
                 <h1>{siteName}</h1>
                 <p>.</p>
                <h3>{websites[siteIndex].status}</h3>
                 </div> 
                  <div className={styles.Wwtablewrap}>
                    <table>
                        <thead>
                            <tr>
                            <th>Page</th>
                            <th>status</th>
                            <th>details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr> 
                                <td>{websites[siteIndex].pagename}</td>
                                <td><select value={websites[siteIndex].status} className={styles.dropdwn} onClick={(e)=>{updateStat(e)}} >
                                {dropOpt.map(opt=>(<option>{opt.label}</option>))}
                                </select>
                                </td>
                                <td><a href={`/editor/${websites[siteIndex]._id}`} className={styles.WpageOpen}>open</a></td>
                            </tr>
                        </tbody>
                    </table>
                  </div>
                </section>
            )}

            {menu ==='settings' && (
                <section id='#settingContainer' className={styles.Swrapp}>
                    <h1>User account</h1>
                    <div className={styles.Suseracc}>            
                        <p>Name : <b>{uName}</b></p>
                        <p>Username : <b>{uUsrName}</b></p>
                    </div>
                    <div className={styles.SuserSupp}>
                        <p><a href="/#contact">Help</a></p>
                        <p>found any issue? write in <a href="https://github.com/yashas-ravi/BuildBox/issues">github</a></p>
                        <p onClick={()=>handleLogout()} className={styles.Slogout}><p>Log out</p></p>
                    </div>
                </section>
            ) }

        </section>
    );
}