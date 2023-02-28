package Model;

import java.awt.BorderLayout;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.JButton;
import javax.swing.JTextField;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JComboBox;
import java.awt.FlowLayout;
import java.awt.GridLayout;
import javax.swing.SwingConstants;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

public class MainFrame extends JFrame {

	private JPanel contentPane;
	private JTextField numMonedas;
	private JLabel resultado;
	private String conversiones[] = { "MXN to USD", "MXN to EURO", "MXN to GBP", "USD to MXN", "USD to EURO",
			"USD to GBP", "EURO to MXN", "EURO to USD", "EURO to GBP", "GBP to MXN", "GBP to USD", "GBP to EURO",
			"MXN to YEN", "MXN to WON", "YEN to MXN", "WON to MXN" };
	private int tasaDeCambio;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					MainFrame frame = new MainFrame();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the frame.
	 */
	public MainFrame() {
		setTitle("Conversor de Monedas");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 280, 372);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));

		setContentPane(contentPane);
		contentPane.setLayout(null);

		JLabel lblNewLabel = new JLabel("Digita el número de monedas");
		lblNewLabel.setBounds(10, 11, 235, 50);
		lblNewLabel.setHorizontalAlignment(SwingConstants.CENTER);
		contentPane.add(lblNewLabel);

		numMonedas = new JTextField();
		numMonedas.setHorizontalAlignment(SwingConstants.RIGHT);
		numMonedas.setBounds(10, 61, 235, 50);
		contentPane.add(numMonedas);
		numMonedas.setColumns(10);

		JLabel lblNewLabel_1 = new JLabel("Selecciona el tipo de Cambio:");
		lblNewLabel_1.setBounds(10, 110, 235, 50);
		lblNewLabel_1.setHorizontalAlignment(SwingConstants.CENTER);
		contentPane.add(lblNewLabel_1);

		JComboBox comboBox = new JComboBox(conversiones);
		comboBox.setBounds(10, 161, 235, 50);
		contentPane.add(comboBox);

		JButton boton = new JButton("Convertir");
		boton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				try {
					double monedas = Double.valueOf(numMonedas.getText());
					tasaDeCambio = comboBox.getSelectedIndex();
					Convertir respuesta = new Convertir(monedas, tasaDeCambio);
					JOptionPane.showMessageDialog(null, "Tienes " + respuesta.getResultado() + respuesta.getTipo());

				} catch (NumberFormatException except) {
					except.getStackTrace();
					JOptionPane.showMessageDialog(null, "No manches carnal, pon números rey");
					numMonedas.setText("");
				}
			
				var input = JOptionPane.showConfirmDialog(null, "¿Quieres hacer otra conversión?",
						"¿Quieres continuar?", JOptionPane.YES_NO_CANCEL_OPTION, JOptionPane.QUESTION_MESSAGE);
				if (input != JOptionPane.YES_OPTION)
				{
					JOptionPane.showMessageDialog(null, "Este programa... Se acabó !!!");
				    System.exit(0);
				}

			}
		});
		boton.setBounds(10, 216, 235, 50);
		contentPane.add(boton);

		resultado = new JLabel("");
		resultado.setHorizontalAlignment(SwingConstants.CENTER);
		resultado.setBounds(11, 269, 235, 50);
		contentPane.add(resultado);
	}
}
