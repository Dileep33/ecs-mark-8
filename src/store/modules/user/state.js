export default {
    data: {},
    loading_state: 'LOADING',
    notification_count: 0,
    pending_messages: false,
    logout_user: false,
    post_login_action: {
        action: null,
        data: null,
        pratilipiData: null
    },
    loading_error_message: {},
    login_source: null,
    signup_source: null,
    forgot_password_update_state: 'LOADING_SUCCESS',
    growth_db_initialized: false,
    read_stats: {
        read_count: 0,
        read_books: []
    },
    email_check: {
        is_valid: null,
        loading_state: 'INITIAL'
    }
}
