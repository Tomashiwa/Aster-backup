class Api::TagsController < ApiController
    before_action :authenticate_user
    before_action :set_tag, only: [:show, :update, :destroy]

    #GET /tags
    def index
        if current_user.admin?
            @tags = Tag.all
            render json: @tags
        end
    end

    #GET /tags/#
    def show
        render json: @tag
    end

    #POST /tag
    def create
        @tag = Tag.new(tag_params)

        if @tag.save
            render json: @tag, status: :create, location: @tag
        else
            render json: @tag.errors, status: :unprocessable_entity
        end
    end

    #PATCH/PUT /tags/#
    def update
        if @tag.update(tag_params)
            render json: @tag
        else 
            render json: @tag.errors, status: :unprocessable_entity
        end
    end

    #DELETE /tags/#
    def destroy
        @tag.destroy
    end

    private
        def set_tag
            @tag = Tag.find(params[:id])
        end

        def tag_params
            params.require(:tag).permit(:name)
        end
end
