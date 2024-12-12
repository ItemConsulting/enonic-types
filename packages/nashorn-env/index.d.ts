declare const Java: {
  /**
   * The Java.type() function takes a string with the fully qualified Java class name, and returns the corresponding
   * JavaClass function object.
   */
  type<JavaClass>(className: string): JavaClass;

  /**
   * If you have an existing JavaScript array, you can convert it to a Java array using the Java.to() function.
   */
  to<JavaClass, T>(arr: Array<T>, javaType: JavaClass): JavaClass & ArrayLike<T>;

  /**
   * You can extend a class using the Java.extend() function that takes a Java type as the first argument and method
   * implementations (in the form of JavaScript functions) as the other arguments.
   */
  extend<JavaClass>(javaType: JavaClass, implementation: JavaClass): JavaClass;
};
