package com.lucas.spring.components.tmp;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

  @RequestMapping("/")
  public @ResponseBody String greeting() {
    return "Hello, World";
  }
}