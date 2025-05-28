package com.ArqDSw.planetario_virtual_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ArqDSw.planetario_virtual_backend.dto.UserDTO;
import com.ArqDSw.planetario_virtual_backend.dto.UserLoginDTO;
import com.ArqDSw.planetario_virtual_backend.dto.UserResponseDTO;
import com.ArqDSw.planetario_virtual_backend.exception.DuplicateEmailException;
import com.ArqDSw.planetario_virtual_backend.exception.InvalidCredentialsException;
import com.ArqDSw.planetario_virtual_backend.exception.UserNotFoundException;
import com.ArqDSw.planetario_virtual_backend.model.User;
import com.ArqDSw.planetario_virtual_backend.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired 
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    //private final JwtTokenService jwtTokenService;

    @Autowired
    public UserService(UserRepository userRepository, 
                       PasswordEncoder passwordEncoder,
                       JwtTokenService jwtTokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        //this.jwtTokenService = jwtTokenService;
    }

    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    public UserResponseDTO getUserById(Long id) {
        return userRepository.findById(id)
                .map(this::convertToResponseDTO)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }

    public UserResponseDTO signUpUser(UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new DuplicateEmailException("Email already in use: " + userDTO.getEmail());
        }

        User newUser = new User();
        newUser.setName(userDTO.getName());
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        User savedUser = userRepository.save(newUser);
        return convertToResponseDTO(savedUser);
    }

    public UserLoginDTO authenticateUser(UserLoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        //String token = jwtTokenService.generateToken(user);

        UserLoginDTO responseDTO = new UserLoginDTO();
        responseDTO.setEmail(user.getEmail());
        //responseDTO.setToken(token);
        responseDTO.setPassword(null); 
        return responseDTO;
    }

    public UserResponseDTO updateUser(Long id, UserDTO userDTO) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));

        if (userDTO.getName() != null && !userDTO.getName().isBlank()) {
            existingUser.setName(userDTO.getName());
        }

        if (userDTO.getEmail() != null && !userDTO.getEmail().isBlank()) {
            if (!existingUser.getEmail().equals(userDTO.getEmail())) {
                if (userRepository.existsByEmail(userDTO.getEmail())) {
                    throw new DuplicateEmailException("Email already in use: " + userDTO.getEmail());
                }
                existingUser.setEmail(userDTO.getEmail());
            }
        }

        if (userDTO.getPassword() != null && !userDTO.getPassword().isBlank()) {
            existingUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        User updatedUser = userRepository.save(existingUser);
        return convertToResponseDTO(updatedUser);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    private UserResponseDTO convertToResponseDTO(User user) {
        return new UserResponseDTO(
            user.getId(),
            user.getName(),
            user.getEmail()
        );
    }
}
