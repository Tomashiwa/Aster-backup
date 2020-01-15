class Api::ListsController < ApiController
    before_action :authenticate_user
    before_action :set_list, only: [:show, :update, :destroy]

    #GET /lists
    def index
        if current_user.admin?
            @lists = List.all
            render json: @lists
        end
    end

    #GET /lists/#
    def show
        render json: @list
    end

    #POST /list
    def create
        @list = List.new(list_params)

        if @list.save
            render json: @list, status: :create, location: @list
        else
            render json: @list.errors, status: :unprocessable_entity
        end
    end

    #PATCH/PUT /lists/#
    def update
        if @list.update(list_params)
            render json: @list
        else 
            render json: @list.errors, status: :unprocessable_entity
        end
    end

    #DELETE /lists/#
    def destroy
        @list.destroy
    end

    private
        def set_list
            @list = List.find(params[:id])
        end

        def list_params
            params.require(:list).permit(:board_id, :name)
        end
    
end