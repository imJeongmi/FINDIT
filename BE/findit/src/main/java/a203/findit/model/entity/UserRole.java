package a203.findit.model.entity;

public enum UserRole {
    ROLE_ADMIN("ROLE_ADMIN"),
    ROLE_USER("ROLE_USER"),
    ROLE_GUEST("ROLE_GUEST");

    private final String role;

    UserRole(String role){
        this.role = role;
    }

    public String getValue(){
        return role;
    }

}
