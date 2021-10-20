import {
  IonActionSheet,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/react'
import 'src/pages/BooksView.css'
import React, { useEffect, useRef, useState } from 'react'
import { matchSorter } from 'match-sorter'
import { add, close, person } from 'ionicons/icons'
import { Member } from 'src/supabase-api/interfaces/member'
import { getMembersQry } from 'src/supabase-api/get-members-qry'
import { MemberFormModal } from 'src/components/MemberFormModal'
import { getMode } from '@ionic/core'

export const BorrowBookView: React.FC = () => {
  const [showMemberActionSheet, setShowMemberActionSheet] = useState(false)
  const router = useIonRouter()

  const [searchText, setSearchText] = useState('')
  const [members, setMembers] = useState<Member[]>([])
  const [selectedMember, setSelectedMember] = useState<Member | undefined>(undefined)
  const [isLoadingMembers, setIsLoadingMembers] = useState(false)

  useEffect(() => {
    setIsLoadingMembers(true)
    getMembersQry().then(response => {
      setIsLoadingMembers(false)
      setMembers(response)
    })
  }, [])

  const filteredMembers = matchSorter(members, searchText, { keys: ['name', 'surname', 'phone_number'] })

  const openMemberActionSheet = (member: Member) => {
    setSelectedMember(member)
    setShowMemberActionSheet(true)
  }

  const borrowBook = async () => {
    const bookId = new URLSearchParams(router.routeInfo.search).get('bookId')
    console.log('bookId', bookId)
    await new Promise(resolve => {
      setTimeout(() => {
        resolve('asd')
      }, 200)
    })
    router.goBack()
  }

  const pageRef = useRef<HTMLElement>(null)
  const memberFormModalRef = useRef<HTMLIonModalElement>(null)

  const [showMemberFormModal, setShowMemberFormModal] = useState(false)

  const mode = getMode()

  return (
    <IonPage ref={pageRef}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Miembros</IonTitle>
          <IonButtons slot='start'>
            <IonButton onClick={() => router.goBack()}>Cancelar</IonButton>
          </IonButtons>
          <IonButtons slot='end'>
            <IonButton onClick={() => setShowMemberFormModal(true)}>
              <IonIcon icon={add} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={searchText}
            onIonChange={e => setSearchText(e.detail.value!)}
            placeholder='Buscar por nombre, apellidos, teléfono'
            debounce={0}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isLoadingMembers && <IonSpinner className='books-loading-spinner' />}
        {filteredMembers.length !== 0 && (
          <IonList>
            {filteredMembers.map(member => {
              return (
                <IonItem key={member.id} onClick={() => openMemberActionSheet(member)}>
                  <IonLabel>
                    <h2>
                      {member.name} {member.surname}
                    </h2>
                    <p>{member.phone_number}</p>
                  </IonLabel>
                </IonItem>
              )
            })}
          </IonList>
        )}
        <IonActionSheet
          header={`${selectedMember?.name} ${selectedMember?.surname}`}
          isOpen={showMemberActionSheet}
          onDidDismiss={() => setShowMemberActionSheet(false)}
          buttons={[
            {
              text: 'Prestar libro',
              icon: mode === 'ios' ? undefined : person,
              handler: borrowBook
            },
            {
              text: 'Cancelar',
              icon: mode === 'ios' ? undefined : close,
              role: 'cancel',
              handler: () => {
                setShowMemberActionSheet(false)
              }
            }
          ]}
        />
        {pageRef.current !== null && (
          <MemberFormModal
            ref={memberFormModalRef}
            presentingElement={pageRef.current}
            isOpen={showMemberFormModal}
            onClose={() => setShowMemberFormModal(false)}
          />
        )}
      </IonContent>
    </IonPage>
  )
}
