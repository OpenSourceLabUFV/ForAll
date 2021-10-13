import React from "react";
import MyHeaderProps from "./MyHeaderInterface";
import { IonLabel, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import logo from "../../assets/ic_launcher-web.png";

const MyHeader = ({ name }: MyHeaderProps) => (
	<IonHeader>
		<IonToolbar>
			<IonTitle>{name}</IonTitle>
			<IonLabel slot="end">
				<img height={60} src={logo} />
			</IonLabel>
		</IonToolbar>
	</IonHeader>
);

export default MyHeader;
