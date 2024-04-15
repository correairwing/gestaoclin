package com.icorrea.auth;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.icorrea.repository.IUserRepository;
import com.icorrea.model.User;

@Service
public class AuthService {
	
	@Autowired
    private IUserRepository userRepository;

    public boolean authenticate(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        return userOptional.map(user -> user.getPassword().equals(password)).orElse(false);
    }
}
