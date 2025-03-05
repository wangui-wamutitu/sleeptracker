import { IonIcon, IonRange } from "@ionic/react";
import "./SleepRating.css";
import { batteryDeadOutline, batteryFullOutline } from "ionicons/icons";

interface ContainerProps {
  title: string;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number | null>>
}

const SleepRating: React.FC<ContainerProps> = ({ title, rating, setRating }) => {
  return (
    <div className="container">
      <strong>{title}</strong>
      <IonRange
        ticks={true}
        snaps={true}
        pin={true}
        min={1}
        max={7}
        value={rating}
        onIonChange={({ detail }) =>
          setRating(detail.value as number)
        }
      >
        <IonIcon slot="start" icon={batteryFullOutline}></IonIcon>
        <IonIcon slot="end" icon={batteryDeadOutline}></IonIcon>
      </IonRange>
    </div>
  );
};

export default SleepRating;
