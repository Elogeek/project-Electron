import SplashScreen from "react-windows-ui/dist/components/SplashScreen";
import {AppTheme, NavBar, NavBarLink, NavPageContainer} from "react-windows-ui";
import {useEffect, useState} from 'react';

export const AppWrapper = function({children, theme}) {

    const [splash, setSplash] = useState(true);

    useEffect(() => {
        setSplash(false);
    }, []);

    return(
        <>
            <SplashScreen isVisible={splash} title={"Tracker UpTo"}/>
            <AppTheme scheme={theme}/>
            <NavBar title="Tracker" shadowOnScroll={true}>
                <h1>Projets</h1>
                <div className="app-hr"></div>
                <NavBarLink to="/" exact={true} text="Accueil"/>
                <NavBarLink to="/editor" exact={true} text="Editeur de texte"/>
                <NavBarLink to="/electron" text="Cours Electron" icon={<i className="icons10-grid-2"></i>}/>
                <NavBarLink to="/react-native" text="Cours React Native" icon={<i className="icons10-columns"></i>}/>
            </NavBar>
            <NavPageContainer hasPadding={true} animateTransition={true}>
                {children}
            </NavPageContainer>
        </>
    );
}