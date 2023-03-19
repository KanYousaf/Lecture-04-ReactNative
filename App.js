import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useState } from "react";
import { styles } from "./style_signup";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomainNames = ["yahoo.com", "gmail.com", "uettaxila.edu.pk"];
    const domain = email.split("@")[1];

    if (!regex.test(email)) {
      setEmailError("Please enter valid email address");
      return false;
    }

    if (!validDomainNames.includes(domain)) {
      setEmailError("Please enter valid domain");
      return false;
    }

    return true;
  };
  const isValidPassword = (password, confirmPassword) => {
    const passwordRegex =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if (password === confirmPassword) {
      if (!passwordRegex.test(password)) {
        setPasswordError(
          "Please enter password with atleast 8 characters, 1 uppercase letter, 1 number and 1 special case letter"
        );
        return false;
      }
    } else {
      setConfirmPasswordError("Password and confirm password donot match");
      return false;
    }
    return true;
  };

  const onSignUp = () => {
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setEmailError("Please enter your email, password and confirm password");
      setSuccessMessage("");
    } else {
      if (isValidEmail(email) && isValidPassword(password, confirmPassword)) {
        setSuccessMessage("Successfully entered data");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dummy App</Text>
      <Text style={styles.title}>Welcome to this group, Join Us</Text>
      <View style={styles.container_signup}>
        <TextInput
          style={styles.inputContainer}
          placeholder="Enter your e-mail"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
          }}
          onFocus={() => {
            setEmailError("");
          }}
        />
        {emailError !== "" && <Text style={styles.error}>{emailError}</Text>}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={(value) => {
              setPassword(value);
            }}
            onFocus={() => {
              setPasswordError("");
            }}
          />
          <Pressable
            style={styles.iconContainer}
            onPress={() => setHidePassword(!hidePassword)}
          >
            <Text style={styles.hideShowButtonText}>
              {hidePassword ? "Show" : "Hide"}
            </Text>
          </Pressable>
        </View>
        {passwordError !== "" && (
          <Text style={styles.error}>{passwordError}</Text>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            secureTextEntry={hideConfirmPassword}
            value={confirmPassword}
            onChangeText={(value) => {
              setConfirmPassword(value);
            }}
            onFocus={() => {
              setConfirmPasswordError("");
            }}
          />
          <Pressable
            style={styles.iconContainer}
            onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
          >
            <Text style={styles.hideShowButtonText}>
              {hideConfirmPassword ? "Show" : "Hide"}
            </Text>
          </Pressable>
        </View>
        {confirmPasswordError !== "" && (
          <Text style={styles.error}>{confirmPasswordError}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={onSignUp}>
        <Text style={styles.buttonText}>Sign-Up</Text>
      </TouchableOpacity>
      {successMessage !== "" && (
        <Text style={styles.success}>{successMessage}</Text>
      )}
    </View>
  );
}
