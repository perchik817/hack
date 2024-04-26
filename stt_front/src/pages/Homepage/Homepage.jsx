// import cl from "./Homepage.module.scss";
// import {Link} from "react-router-dom";
// import icon1 from "../../assets/flex.svg"
// import icon2 from "../../assets/Vector.svg"
// import icon3 from "../../assets/flex3.svg"
// import icon4 from "../../assets/flex4.svg"
// import icon5 from "../../assets/flex2.svg"


// function Homepage() {
//     return (
//         <section className={cl.HomePage}>
//             <div className={cl.cont}>
//                 <section className={cl.left}>
//                     <img
//                         src="https://globalsiasar.org/sites/default/files/styles/hd/public/photos/extra/kyrgyzstan_ex-ua4whx_tourist-attractions_dx-news.jpg?itok=l0AZXdl3"
//                         alt=""/>
//                     <aside>
//                         <Link to={"/coursepage"}>
//                             <img src={icon5} alt="" width={64} height={64}/>
//                             <h4>Уроки кыргызского языка</h4>
//                             <div>
//                                 <p>
//                                     Аудирование, чтение и граматика. <br/>
//                                     Теория и практика
//                                 </p>
//                                 <img src={icon2} alt=""/>
//                             </div>
//                         </Link>
//                     </aside>
//                 </section>

//                 <section className={cl.right}>
//                     <div>
//                         <img src={icon1} alt=""/>
//                         <article>
//                             <aside>
//                                 <h3>Учить кыргызский по <br/> аудио</h3>
//                                 <p>Читайте кыргызские книги с переводом и озвучкой</p>
//                             </aside>
//                             <Link to={"/audiopage"}>
//                                 <img src={icon2} alt=""/>
//                             </Link>
//                         </article>

//                     </div>

//                     <div>
//                         <img src={icon3} alt=""/>

//                         <article>
//                             <aside>
//                                 <h3>Учить кыргызский по фильмам</h3>
//                                 <p>Загрузите своё видео и сгенерируйте свои субтитры</p>
//                             </aside>
//                             <Link to={"/videopage"}>
//                                 <img src={icon2} alt=""/>
//                             </Link>
//                         </article>

//                     </div>

//                     <div>
//                         <img src={icon4} alt=""/>
//                         <article>
//                             <aside>
//                                 <h3>Учить кыргызский по книгам</h3>
//                                 <p>Слушайте песни с субтитрами, переводом и озвучкой</p>
//                             </aside>
//                             <Link to={"/bookpage"}>
//                                 <img src={icon2} alt=""/>
//                             </Link>
//                         </article>

//                     </div>

//                 </section>
//             </div>
//         </section>
//     )
// }

// export default Homepage;
import cl from "./Homepage.module.scss";
import { Link } from "react-router-dom";

function Homepage() {
    return (
        <section className={cl.HomePage}>
            <div className={cl.cont}>
                <section className={cl.left}>
                    {/* Логотип Kyrgyz Translate */}
                    <Link to="/">
                        <p>Kyrgyz Translate</p>
                    </Link>
                </section>

                <section className={cl.right}>
                    <div>
                        {/* Текстовый контент */}
                        <h3>Kyrgyz Translate - видеолорду кыргызча көрү!</h3>
                        <p>
                            Kyrgyz Translate поможет вам с переводом и озвучкой кыргызских текстов и видео.
                        </p>
                        {/* Навигация */}
                        <Link to="/videopage">
                            Перейти к видео
                        </Link>
                        <Link to="/audiopage">
                            Перейти к аудио
                        </Link>
                    </div>
                </section>
            </div>
        </section>
    )
}

export default Homepage;

