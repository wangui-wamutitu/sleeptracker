import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import "./OvernightSleep.css";
import SelectTime from "../components/SelectTime";
import { useEffect, useState } from "react";
import { OvernightSleepData } from "../data/overnight-sleep-data";
import { saveSleepData } from "../services/IndexedDBService";
import OvernightSleepLogs from "../components/OvernightSleepLogs";

const OvernightSleep: React.FC = () => {
  const [sleepTime, setSleepTime] = useState<Date | null>(null);
  const [wakeTime, setWakeTime] = useState<Date | null>(null);
  const [hoursSlept, setHoursSlept] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  useEffect(() => {
    if (sleepTime && wakeTime) {
      try {
        const formattedSleepTime = new Date(sleepTime);
        const formattedWakeTime = new Date(wakeTime);

        const sleepEntry = new OvernightSleepData(
          formattedSleepTime,
          formattedWakeTime
        );
        setHoursSlept(
          `${sleepEntry.summaryString()}\n${sleepEntry.dateString()}`
        );
      } catch (error) {
        console.error("Error creating OvernightSleepData:", error);
      }
    }
  }, [sleepTime, wakeTime]);

  async function handleSubmit() {
    setIsLoading(true);
    try {
      if (sleepTime && wakeTime) {
        await saveSleepData(sleepTime, wakeTime);
        setIsSuccess(true);
      }
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Overnight Sleep</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <section style={{marginTop: '20px'}}>
          <SelectTime
            title="Enter Sleeping Time:"
            usageId="sleepTimePicker"
            setTime={setSleepTime}
          />
          <SelectTime
            title="Enter Waking Up Time:"
            usageId="wakeTimePicker"
            setTime={setWakeTime}
          />
        </section>
        {sleepTime && wakeTime ? <pre>Hours slept: {hoursSlept}</pre> : null}
        <div className="buttonContainer" style={{marginTop:'20px'}}>
          <IonButton fill="outline" size="default" onClick={handleSubmit}>
            {isLoading ? 'Saving...' :'Save'}
          </IonButton>
        </div>
        {showLogs ? <OvernightSleepLogs showLogs={showLogs} setShowLogs={setShowLogs} /> : null}

        <IonToast
          isOpen={isSuccess}
          message="Successfully logged your sleeping hours"
          positionAnchor="footer"
          onDidDismiss={() => setIsSuccess(false)}
          duration={4000}
        ></IonToast>
        <IonToast
          isOpen={isError}
          message="Could not logged your sleeping hours. Try again"
          positionAnchor="footer"
          onDidDismiss={() => setIsError(false)}
          duration={4000}
        ></IonToast>
      </IonContent>
      <div className={"buttonContainer"} style={{marginBottom: '60px'}}>
        <IonButton fill="outline" size="default" onClick={() => setShowLogs(!showLogs)}>
          View your logs
        </IonButton>
      </div>
    </IonPage>
  );
};

export default OvernightSleep;
