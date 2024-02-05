import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { SCREEN_WIDTH } from "../styles/mainStyles";

export default function ModalPayment({ fee, open, setOpen, address, amount, onSent, onCancel }) {
	return (
		<View >
			<Modal animationType="slide" transparent={true} visible={open} onRequestClose={() => setOpen(false)}>
				<TouchableOpacity activeOpacity={1} underlayColor='transparent' style={styles.container} onPress={() => setOpen(false)}>
					<TouchableOpacity activeOpacity={1} underlayColor='transparent' onPress={(e) => e.preventDefault()} style={styles.content}>
						<Text style={styles.title}>Send Payment</Text>
						<Text style={styles.text}>To: {address}</Text>
						<Text style={styles.text}>Amount: {amount}</Text>
						<Text style={styles.text}>Fees: {fee}</Text>


						<View style={styles.button_container}>
							<TouchableOpacity style={styles.button} onPress={onCancel}>
								<View>
									<Text style={styles.button_text_cancel}>Cancel</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.button} onPress={onSent}>
								<View>
									<Text style={styles.button_text_confirm}>Confirm</Text>
								</View>
							</TouchableOpacity>
						</View>
					</TouchableOpacity>
				</TouchableOpacity>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		alignItems: "center",
		justifyContent: "center",
	},
	content: {
		width: SCREEN_WIDTH - 65,
		borderRadius: 6,
		backgroundColor: '#F2F2F2',
		paddingTop: 18,
	},
	title: {
		color: '#000000',
		fontSize: 17,
		fontWeight: '700',
		textAlign: 'center'
	},
	text: {
		color: '#000000',
		fontSize: 13,
		paddingHorizontal: 17
	},
	network_box: {
		width: SCREEN_WIDTH - 106,
		alignItems: "center",
		justifyContent: "center",
		height: 44,
		borderTopWidth: 1,
		borderTopColor: 'rgba(60, 60, 67, 0.36)'
	},
	network_name: {
		color: '#999999',
		fontSize: 17,
	},
	network_name_active: {
		color: '#007AFF',
		fontSize: 17,
	},
	button_container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderTopColor: 'rgba(60, 60, 67, 0.36)',
		borderTopWidth: 1,
		marginTop: 21
	},
	button: {
		width: (SCREEN_WIDTH - 65)/2,
		alignItems: "center",
		justifyContent: "center",
		height: 43,
		borderRightColor: 'rgba(60, 60, 67, 0.36)',
		borderRightWidth: 1,
	},
	button_text_cancel: {
		color: '#007AFF',
		fontSize: 17
	},
	button_text_confirm: {
		color: '#007AFF',
		fontSize: 17,
		fontWeight: '700'
	}
});
