import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import "./DaySleepiness.css";
import SleepRating from "../components/SleepRating";
import { useState } from "react";
import { saveSleepinessData } from "../services/IndexedDBService";
import DaySleepinessLogs from "../components/DaySleepinessLogs";

const DaySleepiness: React.FC = () => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  async function handleSubmit() {
    setIsLoading(true);
    try {
      if (rating) {
        const timeLogged = new Date();
        await saveSleepinessData(rating, timeLogged.toString(), text);
        setIsSuccess(true);
      }
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
    setText("");
    setRating(1);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sleepiness During the Day</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <section style={{ marginTop: "20px", marginBottom: "40px" }}>
          <SleepRating
            title="How sleepy/alert are you feeling?"
            setRating={setRating}
            rating={rating ?? 1}
          />
        </section>

        <IonTextarea
          fill="outline"
          placeholder="What is causing that rating?(optional)"
          autoGrow={true}
          value={text}
          onIonInput={(e) => setText(e.target.value as string)}
        ></IonTextarea>
        <div className={"buttonContainer"} style={{ marginTop: "60px" }}>
          <IonButton fill="outline" size="default" onClick={handleSubmit}>
            {isLoading ? "Saving..." : "Save"}
          </IonButton>
        </div>
        {showLogs ? (
          <DaySleepinessLogs showLogs={showLogs} setShowLogs={setShowLogs} />
        ) : null}

        <IonToast
          isOpen={isSuccess}
          message="Successfully logged your data"
          positionAnchor="footer"
          onDidDismiss={() => setIsSuccess(false)}
          duration={4000}
        ></IonToast>
        <IonToast
          isOpen={isError}
          message="Could not logged your data. Try again"
          positionAnchor="footer"
          onDidDismiss={() => setIsError(false)}
          duration={4000}
        ></IonToast>
      </IonContent>
      <div className={"buttonContainer"} style={{ marginBottom: "60px" }}>
        <IonButton
          fill="outline"
          size="default"
          onClick={() => setShowLogs(!showLogs)}
        >
          View your logs
        </IonButton>
      </div>
    </IonPage>
  );
};

export default DaySleepiness;
