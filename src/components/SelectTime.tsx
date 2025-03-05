import { IonDatetime, IonDatetimeButton, IonModal } from "@ionic/react";
import "./SelectTime.css";

interface ContainerProps {
  title: string;
  setTime: React.Dispatch<React.SetStateAction<Date | null>>;
  usageId: string
}

const SelectTime: React.FC<ContainerProps> = ({ title, setTime, usageId }) => {
  return (
    <div className="container" style={{marginBottom:'60px'}}>
      <strong>{title}</strong>
      <>
        <IonDatetimeButton datetime={usageId}></IonDatetimeButton>

        <IonModal keepContentsMounted={true}>
          <IonDatetime
            id={usageId}
            onIonChange={(e) => setTime(e.detail.value as Date | null)}
          ></IonDatetime>
        </IonModal>
      </>
    </div>
  );
};

export default SelectTime;
