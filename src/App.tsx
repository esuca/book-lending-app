import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { search, swapHorizontal } from 'ionicons/icons'
import { BooksView } from 'src/pages/BooksView'
import { LoansView } from 'src/pages/LoansView'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import { BorrowBookView } from 'src/pages/BorrowBookView'

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path='/books'>
            <BooksView />
          </Route>
          <Route exact path='/loans'>
            <LoansView />
          </Route>
          <Route exact path='/borrow-book'>
            <BorrowBookView />
          </Route>
          <Route exact path='/'>
            <Redirect to='/books' />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot='bottom'>
          <IonTabButton tab='tab1' href='/books'>
            <IonIcon icon={search} />
            <IonLabel>Libros</IonLabel>
          </IonTabButton>
          <IonTabButton tab='tab2' href='/loans'>
            <IonIcon icon={swapHorizontal} />
            <IonLabel>Préstamos</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
)

export default App
