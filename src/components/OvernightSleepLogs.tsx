import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { deleteSleepData, getAllSleepData } from "../services/IndexedDBService";
import { OvernightSleepData } from "../data/overnight-sleep-data";
import { chevronBackOutline, trashOutline } from "ionicons/icons";

interface ContainerProps {
  showLogs: boolean;
  setShowLogs: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SleepLogs {
  id: number;
  sleepEnd: string;
  sleepStart: string;
  timestamp: string;
}
const OvernightSleepLogs: React.FC<ContainerProps> = ({
  showLogs,
  setShowLogs,
}) => {
  const [sleepLogs, setSleepLogs] = useState<SleepLogs[] | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    const sleepEntries = await getAllSleepData();
    setSleepLogs(sleepEntries);
  };
  useEffect(() => {
    fetchData();
  }, []);

  function getHoursSlept(sleepTime: string, wakeTime: string) {
    const formattedSleepTime = new Date(sleepTime);
    const formattedWakeTime = new Date(wakeTime);

    const sleepEntry = new OvernightSleepData(
      formattedSleepTime,
      formattedWakeTime
    );

    return `${sleepEntry.summaryString()}`;
  }

  async function handleDeleteLog(id: number){
    try {
        await deleteSleepData(id);
        setIsSuccess(true)
        fetchData()
    } catch (error) {
        setIsError(true)
    }
  }
  return (
    <IonModal isOpen={showLogs}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setShowLogs(false)}>
                <IonIcon icon={chevronBackOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle style={{fontSize: '16px'}}>Your Overnight Sleep Logs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList inset={true}>
          {sleepLogs && sleepLogs?.length > 0 ? (
            sleepLogs?.map((log) => {
              const sleepTime = new Date(log?.sleepStart);
              const wakeTime = new Date(log?.sleepEnd);
              const logTime = new Date(log?.timestamp);
              return (
                <IonItemGroup key={log?.id} style={{marginBottom: '20px'}}>
                    <IonItemSliding>
                        <IonItem>
                            <IonLabel style={{color:'blue', opacity: 0.5}}>Logged at: {`${logTime}`}</IonLabel>
                        </IonItem>
                        <IonItemOptions>
                        <IonItemOption color="danger" type='button' onClick={() => handleDeleteLog(log?.id)}>
                            <IonIcon slot="icon-only" icon={trashOutline}></IonIcon>
                        </IonItemOption>

                        </IonItemOptions>
                    </IonItemSliding>

                  <IonItem lines="none">
                    <IonLabel>Slept at: {`${sleepTime}`}</IonLabel>
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>Woke up at: {`${wakeTime}`}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      Hours slept:
                      {getHoursSlept(log?.sleepStart, log?.sleepEnd)}{" "}
                    </IonLabel>
                  </IonItem>
                </IonItemGroup>
              );
            })
          ) : (
            <p>No sleep logs. Please record some to view</p>
          )}
        </IonList>
        <IonToast
          isOpen={isSuccess}
          message="Successfully deleted log"
          positionAnchor="footer"
          onDidDismiss={() => setIsSuccess(false)}
          duration={4000}
        ></IonToast>
        <IonToast
          isOpen={isError}
          message="Could not delete logs. Try again"
          positionAnchor="footer"
          onDidDismiss={() => setIsError(false)}
          duration={4000}
        ></IonToast>
      </IonContent>
    </IonModal>
  );
};

export default OvernightSleepLogs;
