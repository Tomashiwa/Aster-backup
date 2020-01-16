class Api::UsersController < ApiController
  require 'jwt'
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all
    render :json => @users.to_json( :only => [:id, :name, :admin] ) 
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    # puts "pre-hash"
    # puts params[:user][:password_digest]

    # payload = {password: params[:user][:password_digest]}
    # token = JWT.encode(payload, Rails.application.secrets.secret_key_base, 'HS256')
    
    # puts "post-hash"
    # puts token
    
    # params[:user][:password_digest] = token

    @user = User.new(user_params)

    if @user.save
      render :json => @user.to_json( :only => [:id, :name, :admin] ), status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :password, :password_confirmation, :admin)
    end
end