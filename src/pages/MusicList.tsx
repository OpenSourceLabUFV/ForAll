import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonThumbnail, IonButton, IonIcon, IonNote, IonAvatar} from '@ionic/react';
import MyHeader from '../components/MyHeader';
import ExploreContainer from '../components/ExploreContainer';
import './MusicList.css';
import { micOutline, play } from 'ionicons/icons';

const MusicList: React.FC = () => {
  return (
    <IonPage>
      <MyHeader name ="MusicList"/>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">MusicList</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Lilith</h2>
                  <h3>Alcalyno</h3>
                </IonLabel>  
                <IonNote slot="end">3139s</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Baião</h2>
                  <h3>Balança Eu</h3>
                </IonLabel>  
                <IonNote slot="end">2906</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Asas</h2>
                  <h3>Bicho de Pé</h3>
                </IonLabel>  
                <IonNote slot="end">2751</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Anjo da Guarda Noturno</h2>
                  <h3>Bicho de Pé</h3>
                </IonLabel> 
                <IonNote slot="end">2849</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Eu e Você</h2>  
                  <h3>Bicho de Pé</h3>
                </IonLabel> 
                <IonNote slot="end">3350</IonNote>                               
              </IonItem>
              
              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                <h2>Bata a Porta</h2>
                <h3>Black</h3>
                </IonLabel> 
                <IonNote slot="end">3085</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Casinha Pronta</h2>
                  <h3>Black</h3>
                </IonLabel> 
                <IonNote slot="end">3505</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Acalanto</h2>
                  <h3>Black e Bárbara Greco</h3>
                </IonLabel> 
                <IonNote slot="end">3333</IonNote>                               
              </IonItem> 

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>É Proibido Cochilar</h2>
                  <h3>Circuladô de Fulô</h3>
                </IonLabel> 
                <IonNote slot="end">2180</IonNote>                               
              </IonItem> 

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Vem me Ver</h2>
                  <h3>Circuladô de Fulô</h3>
                </IonLabel> 
                <IonNote slot="end">3164</IonNote>                               
              </IonItem> 

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Flor de Lis</h2>
                  <h3>Circuladô de Fulô</h3>
                </IonLabel> 
                <IonNote slot="end">3785</IonNote>                               
              </IonItem> 

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Baião Caçula</h2>
                  <h3>Dominguinhos</h3>
                </IonLabel> 
                <IonNote slot="end">2241</IonNote>                               
              </IonItem> 

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Desilusão</h2>
                  <h3>Dominguinhos</h3>
                </IonLabel> 
                <IonNote slot="end">2725</IonNote>                               
              </IonItem> 

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Baião de Respeito</h2>
                  <h3>Dona Zaíra</h3>
                </IonLabel> 
                <IonNote slot="end">2665</IonNote>                               
              </IonItem> 

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Encosta n'Eu</h2>
                  <h3>Estakazero</h3>
                </IonLabel> 
                <IonNote slot="end">3003</IonNote>                               
              </IonItem> 

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Avisa</h2>
                  <h3>Falamansa</h3>
                </IonLabel> 
                <IonNote slot="end">2486</IonNote>                               
              </IonItem> 

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Xote dos Milagres</h2>
                  <h3>Falamansa</h3>
                </IonLabel> 
                <IonNote slot="end">2693</IonNote>                               
              </IonItem> 

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>100 anos</h2>
                  <h3>Falamansa</h3>
                </IonLabel> 
                <IonNote slot="end">2908</IonNote>                               
              </IonItem> 

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Medo de Escuro</h2>
                  <h3>Falamansa</h3>
                </IonLabel> 
                <IonNote slot="end">3164</IonNote>                               
              </IonItem> 

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Xote Universitario</h2>
                  <h3>Falamansa</h3>
                </IonLabel> 
                <IonNote slot="end">3202</IonNote>                               
              </IonItem> 

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Nossos Olhos</h2>
                  <h3>Forró Massapê</h3>
                </IonLabel> 
                <IonNote slot="end">3431</IonNote>                               
              </IonItem>  

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Como Todo Amor</h2>
                  <h3>Forrueiros</h3>
                </IonLabel> 
                <IonNote slot="end">3428</IonNote>                               
              </IonItem> 

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Feitiço da Lua</h2>
                  <h3>Forrueiros</h3>
                </IonLabel> 
                <IonNote slot="end">3589</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Esconderijo do Amor</h2>
                  <h3>Genaro</h3>
                </IonLabel> 
                <IonNote slot="end">2499</IonNote>                               
              </IonItem> 

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Amanhecer</h2>
                  <h3>Os 3 Cangaceiros</h3>
                </IonLabel> 
                <IonNote slot="end">2898</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Alambique de Barro</h2>
                  <h3>Os 3 do Nordeste</h3>
                </IonLabel> 
                <IonNote slot="end">2490</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Tem Problema Não</h2>
                  <h3>Trio Bastião</h3>
                </IonLabel> 
                <IonNote slot="end">2412</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Cigano Terrorista</h2>
                  <h3>Trio Cangaço</h3>
                </IonLabel> 
                <IonNote slot="end">2491</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Baião Jovem</h2>
                  <h3>Trio Dona Zefa</h3>
                </IonLabel> 
                <IonNote slot="end">2328</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Canto do Sabiá</h2>
                  <h3>Trio Dona Zefa</h3>
                </IonLabel> 
                <IonNote slot="end">2409</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Você vai se Machucar</h2>
                  <h3>Trio Dona Zefa</h3>
                </IonLabel> 
                <IonNote slot="end">2476</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Ta Esquentando</h2>
                  <h3>Trio Dona Zefa</h3>
                </IonLabel> 
                <IonNote slot="end">2527</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Briga de Artista</h2>
                  <h3>Trio Dona Zefa</h3>
                </IonLabel> 
                <IonNote slot="end">2528</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Baioneiro Gonzagão</h2>
                  <h3>Trio Dona Zefa</h3>
                </IonLabel> 
                <IonNote slot="end">2581</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Produto Nacional</h2>
                  <h3>Trio Dona Zefa</h3>
                </IonLabel> 
                <IonNote slot="end">2734</IonNote>                               
              </IonItem>

              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>Vida Boa Danada</h2>
                  <h3>Trio Dona Zefa</h3>
                </IonLabel> 
                <IonNote slot="end">2762</IonNote>                               
              </IonItem>
              
              <IonItem button onClick={() => { }}>
                <IonIcon icon={play} />
                <IonLabel color="white">
                  <h2>De Tamanco Mulher</h2>
                  <h3>Trio Dona Zefa</h3>
                </IonLabel> 
                <IonNote slot="end">2278</IonNote>                               
              </IonItem>
               

              <IonItem button onClick={() => { }}>
                <IonThumbnail slot="start">
                  <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                </IonThumbnail>
                <IonNote slot="end">3139s</IonNote>
                <IonLabel>Alcalyno </IonLabel>                 
              </IonItem>     

              


          </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MusicList;
