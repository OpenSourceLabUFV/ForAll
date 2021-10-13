import React from "react";
import {
	IonSegment,
	IonSegmentButton,
	IonLabel,
	IonIcon,
	useIonToast,
} from "@ionic/react";

import "./BtnGrid.css";

import { listOutline, micOutline } from "ionicons/icons";
import { MdVibration, MdLooksOne, MdLooksTwo, MdFlare } from "react-icons/md";
import { BsCircle, BsCircleHalf, BsCircleFill } from "react-icons/bs";

// interface BtnGridProps {
//     nameList: string[];
//     stateList: number[];
//     numEl: number;
//   }

// const BtnGrid: React.FC<BtnGridProps> = ({ nameList, stateList, numEl }) => {

const BtnGrid = () => {
	const [present, dismiss] = useIonToast();

	return (
		<div className="switchBtnDiv">
			<IonSegment value="Microphone">
				<IonSegmentButton value="Microphone" layout="icon-start">
					<IonIcon icon={micOutline} />
					<IonLabel>Microphone</IonLabel>
				</IonSegmentButton>
				<IonSegmentButton value="MusicList" layout="icon-start">
					<IonIcon icon={listOutline} />
					<IonLabel>MusicList</IonLabel>
				</IonSegmentButton>
			</IonSegment>

			<IonSegment value="Vibration">
				<IonSegmentButton value="Vibration" layout="icon-start">
					<IonLabel>
						<MdVibration size={22} />
					</IonLabel>
					<IonLabel>Vibration</IonLabel>
				</IonSegmentButton>
				<IonSegmentButton value="Flashes" layout="icon-start">
					<IonLabel>
						<MdFlare size={22} />
					</IonLabel>
					<IonLabel>Flashes</IonLabel>
				</IonSegmentButton>
			</IonSegment>

			<IonSegment
				value="Single"
				onIonChange={(e) => present(`selected: ${e.detail.value}`, 75)}
			>
				<IonSegmentButton value="Single" layout="icon-start">
					<IonLabel>
						<MdLooksOne size={22} />
					</IonLabel>
					<IonLabel>Single</IonLabel>
				</IonSegmentButton>
				<IonSegmentButton value="Double" layout="icon-start">
					<IonLabel>
						<MdLooksTwo size={22} />
					</IonLabel>
					<IonLabel>Double</IonLabel>
				</IonSegmentButton>
			</IonSegment>

			<IonSegment
				value="Normal"
				onIonChange={(e) => present(`selected ${e.detail.value}`, 500)}
			>
				<IonSegmentButton value="Short" layout="icon-start">
					<IonLabel>
						<BsCircle size={22} />
					</IonLabel>
					<IonLabel>Short</IonLabel>
				</IonSegmentButton>
				<IonSegmentButton value="Normal" layout="icon-start">
					<IonLabel>
						<BsCircleHalf size={22} />
					</IonLabel>
					<IonLabel>Normal</IonLabel>
				</IonSegmentButton>
				<IonSegmentButton value="Long" layout="icon-start">
					<IonLabel>
						<BsCircleFill size={22} />
					</IonLabel>
					<IonLabel>Long</IonLabel>
				</IonSegmentButton>
			</IonSegment>
		</div>
	);
};

export default BtnGrid;
