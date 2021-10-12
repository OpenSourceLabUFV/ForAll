import React from "react";
import "./ExploreContainer.css";
import ContainerProps from "./ExploreContainerInterface";

const ExploreContainer = ({ name }: ContainerProps) => (
	<div className="container">
		<strong>{name}</strong>
		<p>
			Explore{" "}
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://ionicframework.com/docs/components"
			>
				UI Components
			</a>
		</p>
	</div>
);

export default ExploreContainer;
