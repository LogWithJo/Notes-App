import Toast from "./Toast";

function NotifactionPortal() {
	return (
		<div>
			<Toast
				message="Note deleted successfully"
				duration={3000}
				variation="success"
			/>
			<Toast
				message="Maximum number of Pin notes reached. Please unPin some notes to add new ones."
				duration={3000}
				variation="error"
			/>
		</div>
	);
}

export default NotifactionPortal;
