import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
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
import {
  deleteSleepinessData,
  getAllSleepinessData,
} from "../services/IndexedDBService";
import { chevronBackOutline, trashOutline } from "ionicons/icons";
import { StanfordSleepinessData } from "../data/stanford-sleepiness-data";

interface ContainerProps {
  showLogs: boolean;
  setShowLogs: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SleepLogs {
  id: number;
  description?: string;
  rating: number;
  timeLogged: string;
  timestamp: string;
}
const DaySleepinessLogs: React.FC<ContainerProps> = ({
  showLogs,
  setShowLogs,
}) => {
  const [sleepLogs, setSleepLogs] = useState<SleepLogs[] | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    const sleepEntries = await getAllSleepinessData();
    setSleepLogs(sleepEntries);
  };
  useEffect(() => {
    fetchData();
  }, []);

  async function handleDeleteLog(id: number) {
    try {
      await deleteSleepinessData(id);
      setIsSuccess(true);
      fetchData();
    } catch (error) {
      setIsError(true);
    } 
  }

  function getStandfordDescription(rating: number, loggedAt: Date) {
    const sleepRating = new StanfordSleepinessData(rating, loggedAt);
    return `${sleepRating.summaryString()}`;
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
          <IonTitle style={{ fontSize: "16px" }}>Day Sleepiness Logs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList inset={true}>
          {sleepLogs && sleepLogs?.length > 0 ? (
            sleepLogs?.map((log) => (
              <IonItemGroup key={log?.id} style={{ marginBottom: "20px" }}>
                <IonItemSliding>
                  <IonItem>
                    <IonLabel style={{ color: "blue", opacity: 0.5 }}>
                      Logged at: {`${log?.timeLogged}`}
                    </IonLabel>
                  </IonItem>
                  <IonItemOptions>
                    <IonItemOption
                      color="danger"
                      type="button"
                      onClick={() => handleDeleteLog(log?.id)}
                    >
                      <IonIcon slot="icon-only" icon={trashOutline}></IonIcon>
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>

                <IonItem lines="none">
                  <IonLabel>
                    Rating:{" "}
                    {getStandfordDescription(
                      log?.rating,
                      new Date(log?.timeLogged)
                    )}
                  </IonLabel>
                </IonItem>
                {log.description ? (
                  <IonItem lines="none">
                    <IonLabel>{log?.description}</IonLabel>
                  </IonItem>
                ) : null}
              </IonItemGroup>
            ))
          ) : (
            <p>No day sleepiness logs. Please record some to view</p>
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

export default DaySleepinessLogs;
