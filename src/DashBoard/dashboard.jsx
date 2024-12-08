import { useState } from 'react';
import styles from './dashboard.module.css';

export const Dashboard = () => {

    const [menu, setMenu] = useState("dashboard");
    const [websites,setWebsites] = useState([]);
    const [siteName, setsiteName] = useState("");
    const [sIndex, setsIndex] = useState(0);

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
     setWebsites([...websites,{id: sIndex, name: siteName[0]}]);
     setsIndex(sIndex+1);
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

    // console.log(websites[0].name);

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
                    <h1 id='dashboard' onClick={()=>setMenu("dashboard")}>Dashboard</h1>
                    <div id='dmenuWebsite' className={styles.dmenuWebsite}>
                    <div className={styles.dmenuWebsiteLabel}>
                        <h1>Websites</h1>
                        <i id='fa-plus' onClick={()=>showInput()} class="fa-solid fa-plus"></i>
                    </div>
                    <form id='inpWrapper' className={styles.inpWrapper} onSubmit={addSite}>
                        <input name='siteInput' type="text" placeholder='Enter your website name' required/>
                        <button id='addSite' type="submit">add</button>
                    </form>
                    <div id='dmenuWebsiteList' className={styles.dmenuWebsiteList}>
                        {websites.map(site =>(<div key={site.id} className={styles.dmenuWebsiteListRow}><p onClick={()=>{setMenu(`${site.name}`); setsiteName(`${site.name}`)}}>{site.name}</p><div className={styles.dmenuWebsiteListIconRow}><i class="fa-solid fa-trash" onClick={()=>{setWebsites(websites.filter(s=>s.id !== site.id))}}></i></div></div>))}
                    </div>
                    </div>
                    <h1 onClick={()=>setMenu("settings")}>Settings</h1>
                </div>
            </div>
            {menu==="dashboard" && (<section className={styles.dcontainer}>
                <div className={styles.dgreet}>
                    <h1>Hello, Manu</h1>
                    <p>1/10/2024</p>
                    <h2 onClick={()=>setMenu("settings")}>Y</h2>
                </div>
                <p className={styles.dgreetlower}>manage your projects here</p>
                <div className={styles.dviewCards}>
                    <div className={styles.dviewCard}>
                        <h1>Recent</h1>
                        <h3>Project name</h3>
                        <p>page1</p>
                        <p>page2</p>
                        <p>page3</p>
                        <button className={styles.dviewCardBtn}>Continue</button>
                    </div>
                    <div className={styles.dviewCard}>
                        <h1>Overall</h1>
                        <div className={styles.dcardRow}>
                            <h3>4/0</h3>
                            <p>completed</p>
                        </div>
                        <div className={styles.dcardRow2}>
                            <div className={styles.dcardclmcolor1}>
                                <p>2</p><p>In Progress</p>
                            </div>
                            <div className={styles.dcardclmcolor2}>
                                <p>1</p><p>Review</p>
                            </div>
                            <div className={styles.dcardclmcolor3}>
                                <p>1</p><p>Completed</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.dactTable}>
                    <h1>Activity</h1>
                    <table>
                        <tr>
                            <th>Website name</th>
                            <th>Status</th>
                            <th>Details</th>
                        </tr>
                        <tr>
                            <td>BuildBox</td>
                            <td>In Progress</td>
                            <td>see details</td>
                        </tr>
                    </table>
                </div>
            </section>)}

            {menu===siteName && (
                <section className={styles.Wwrappper}>
                    <h1>{siteName}</h1>
                </section>  
            )}

            {menu ==='settings' && (
                <section id='#settingContainer' className={styles.Swrapp}>
                    <h1>User account</h1>
                    <div className={styles.Suseracc}>            
                        <p>Name: Manu</p>
                        <p>Username: manuka40</p>
                        <div className={styles.Seditacc}>
                            <p>edit</p>
                            <p>change password</p>
                        </div>
                    </div>
                    <div className={styles.SuserSupp}>
                        <p><a href="/#contact">Help</a></p>
                        <p>found any issue? write in <a href="https://github.com/yashas-ravi/BuildBox/issues">github</a></p>
                        <p className={styles.Slogout}><a href="">Log out</a></p>
                    </div>
                </section>
            ) }
        </section>
    );
}