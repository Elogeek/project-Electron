import {AppWrapper} from "../components/AppWrapper";
import styled from "styled-components";
import { Button } from 'react-windows-ui';
import {useState, useEffect} from "react";

export const TextEditor = function({theme}) {
    const [maCle, setMaCle] = useState(0);
    const [content, setContent] = useState('');

    useEffect( () => {
        window.storage.get('ma_cle')
            .then(data => setMaCle(data))
        ;
    }, []);

    return(
        <AppWrapper theme={theme}>
            <h2>Editeur de texte</h2>
            <span>La valeur du paramètre est {maCle}</span>
            <TextEditorArea
                id={'text-editor'}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <ButtonsContainer>
                <Button
                    justifyContent={'start'}
                    icon={<i className="icons10-save"></i>}
                    value="Sauvegarder"
                    onClick={() => {
                        window.file.save(content);
                        window.notification.show({
                            title: "Sauvegarde",
                            body: "Vous avez bien sauvegardé votre travail !",
                        });
                    }}
                />
                <Button
                    justifyContent={'start'}
                    icon={<i className="icons10-create-new"></i>}
                    value="Charger"
                    onClick={() => window.file.read().then(data => setContent(data))}
                />

                {/* Mise a jour de la valeur du paramètre stocké ma_cle depuis le script de préchargement vers le main process */}
                <Button
                    justifyContent={'start'}
                    value="Set le paramètre ma_cle"
                    onClick={() => {
                        window.storage.set('ma_cle', 'erreur_ici, mauvais type');
                        window.storage.get('ma_cle').then(data => setMaCle(data));
                    }}
                />

                <Button
                    justifyContent={'start'}
                    value="Sauvegarder en BDD"
                    onClick={() => window.database.createText(content)}
                />

                <Button
                    justifyContent={'start'}
                    value="Bouton appel API"
                    onClick={() => window.api.postText(content)}
                />
            </ButtonsContainer>
        </AppWrapper>
    );
}

const TextEditorArea = styled.textarea`
    width: 94%;
    height: 380px;
`;

const ButtonsContainer = styled.div`
    margin-top: 15px;
    
    button {
        margin-right: 10px;
    }
`;